const express = require("express");
const { sendWebEmail } = require("../services/mailer");
const path = require("path");
const ejs = require("ejs");
const mainQueue = require("../queue/mainQueue");
const sendBulkEmails = require("../controllers/sendBulkMailController");

const emailRoute = express.Router();

emailRoute.post("/bull-mail", async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    await mainQueue.add({taskName: "sendMail",  to, subject, body });
    console.log("emailRoute email added to queue");
    res.status(200).json({message: "Email job added to queue" });
  } catch (error) {
    res.status(500).json({error: "Something went wrong", err: error?.message})
  }
});

emailRoute.post("/all", sendBulkEmails );

emailRoute.post("/", async (req, res) => {
  try {
    const to = "amar.bst5822@gmail.com";
    const subject = "Welcome to Wortal";
    const title = "Welcome Wortal";
    const name = "to Ayodhya";
    const imgPath = path.join(__dirname, "../uploads/images", "file-823download-flower.jpg");
    console.log("imgpath >>>", imgPath);
    // Render EJS to HTML string
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "../views", "index.ejs"),
      { name, title }
    );
    console.log("htmlContent emailRoute >>>", htmlContent);

    const result = await sendWebEmail(to, subject, htmlContent, imgPath );
    res.status(200).json({ message: "Email send Successfully.", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = emailRoute;
