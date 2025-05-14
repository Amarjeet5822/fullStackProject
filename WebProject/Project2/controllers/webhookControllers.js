const crypto = require("crypto");
require("dotenv").config();

const webhookController = async (req, res) => {
    console.log("it triggers ***webhook*** route");

    const signature = req.headers["x-razorpay-signature"];
    const rawBodyBuffer = req.body;
    try {
      if (!Buffer.isBuffer(rawBodyBuffer)) {
        throw new Error("Raw body is not a Buffer");
      }
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(rawBodyBuffer)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("❌ Invalid signature");
        return res
          .status(400)
          .json({ success: false, message: "Invalid signature" });
      }
      const parsedBody = JSON.parse(rawBodyBuffer.toString());
      const payload = 
      // 🌟 Successful verification
      console.log("🔔 Event:", parsedBody.event);
      console.log("📦 Full payload:", JSON.stringify(parsedBody, null, 2));

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(
        "❌ Error parsing webhook or verifying signature:",
        error.message
      );
      return res
        .status(500)
        .json({ success: false, message: "Webhook processing failed" });
    }
  }

module.exports = {webhookController};
