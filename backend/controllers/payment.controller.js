import { razorpay } from "../lib/razorpay.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import crypto from "crypto";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity * 100, 0); // Razorpay uses paise
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
      if (coupon) {
        totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
      }
    }

    const order = await razorpay.orders.create({
      amount: totalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(products.map((p) => ({ id: p._id, quantity: p.quantity, price: p.price }))),
      },
    });

    if (totalAmount >= 2000000) { // Adjusted for INR (₹20,000)
      await createNewCoupon(req.user._id);
    }

    res.status(200).json({ orderId: order.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "Error processing checkout", error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await razorpay.orders.fetch(orderId);
    if (order.status === "paid") {
      const products = JSON.parse(order.notes.products);
      if (order.notes.couponCode) {
        await Coupon.findOneAndUpdate(
          { code: order.notes.couponCode, userId: order.notes.userId },
          { isActive: false }
        );
      }

      const newOrder = new Order({
        user: order.notes.userId,
        products: products.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: order.amount / 100, // Convert paise to INR
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
      });

      await newOrder.save();

      res.status(200).json({
        success: true,
        message: "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    res.status(500).json({ message: "Error processing successful checkout", error: error.message });
  }
};

async function createNewCoupon(userId) {
  await Coupon.findOneAndDelete({ userId });

  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  });

  await newCoupon.save();

  return newCoupon;
}