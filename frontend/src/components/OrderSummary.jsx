import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";
import { useState } from "react"; // Added for loading state

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false); // Added to prevent multiple clicks

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    if (isProcessing) return; // Prevent multiple submissions
    setIsProcessing(true); // Disable button
    try {
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      const { orderId, totalAmount } = res.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            };
            await axios.post("/payments/checkout-success", paymentData);
            clearCart();
            window.location.href = `/purchase-success?order_id=${response.razorpay_order_id}&payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}`;
          } catch (error) {
            console.error("Error processing payment:", error);
          } finally {
            setIsProcessing(false); // Re-enable button
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#059669",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating checkout:", error);
      setIsProcessing(false); // Re-enable button on error
    }
  };

  return (
    <motion.div
      className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className='text-xl font-semibold text-emerald-400'>Order summary</p>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-base font-normal text-gray-300'>Original price</dt>
            <dd className='text-base font-medium text-white'>₹{formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Savings</dt>
              <dd className='text-base font-medium text-emerald-400'>-₹{formattedSavings}</dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
              <dd className='text-base font-medium text-emerald-400'>-{coupon.discountPercentage}%</dd>
            </dl>
          )}
          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
            <dt className='text-base font-bold text-white'>Total</dt>
            <dd className='text-base font-bold text-emerald-400'>₹{formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-50'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          disabled={isProcessing} // Disable button during processing
        >
          {isProcessing ? "Processing..." : "Proceed to Checkout"}
        </motion.button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-gray-400'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;