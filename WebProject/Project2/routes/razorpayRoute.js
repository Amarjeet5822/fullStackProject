const express = require("express");
require("dotenv").config();
const { createOrder, verifyPayment } = require("../controllers/ordersControllers");

const razorpayRoute = express.Router();

razorpayRoute.post("/create-order", createOrder );
razorpayRoute.post("/verify-payment", verifyPayment);

razorpayRoute.post("/cancel-payment", (req, res ) => {
  const { orderId } = req.body;
  try {
    console.log("payment cancel")
    res.send("payment cancelled");
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})
razorpayRoute.get("/pay", (req, res) => {
  res.render("payment")
});


module.exports = razorpayRoute;
