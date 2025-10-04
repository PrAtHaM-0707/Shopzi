import Razorpay from "razorpay";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("backend/.env") });

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
