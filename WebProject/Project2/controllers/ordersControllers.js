const razorpay = require("../services/razorpay");
const { Order, Payment, User } = require("../models/index");
const crypto = require("crypto");
require("dotenv").config();

const createOrder = async (req, res ) => {
  try {
  console.log("it triggers >>create-order route >>>")
    const { amount, userId } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    const user = await User.findByPk(userId);
    // console.log("user details >> ", user);
    order.name = user.name;
    order.email = user.email
    // console.log("order >> not db created >> ", order);

    // order : { amount, amount_due, amount_paid, attempts, created_at, currency, entity, id, notes:[], offer_id, receipt, status }
    const key = process.env.RAZORPAY_KEY_ID
    const OrderDb = await Order.create({
      amount,
      razorpayOrderId: order.id,
      currency: order.currency,
      ENUM: order.status,
      createAt: order.created_at,
      userId
     })
    res.status(201).json({ order, key });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const verifyPayment = async (req, res ) => {
  console.log("it triggers verify-payment route")

  const {razorpayPaymentId, orderId, razorpaySignature } = req.body;
  const bodyData = orderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET )
  .update(bodyData)
  .digest("hex");
  if (expectedSignature === razorpaySignature) {
    try {
      console.log("verifyPayment >>> line 44 " )
      const order = await Order.findOne({ where: {razorpayOrderId: orderId } });
      console.log("order >> order not getting razorpayOrderId >> full order details", order)
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });

      order.ENUM = "paid";
      await order.save();
      // ✅ Save payment info
      await Payment.create({
        orderId: order.id,
        razorpayPaymentId,
        razorpaySignature,
        createdAt: order.createdAt,

      });
      return res.status(200).json({ success: true, message: "Payment verified and saved." });

    } catch (error) {
      console.error("DB Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
}
module.exports = { createOrder, verifyPayment };

