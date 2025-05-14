const nodemailer = require("nodemailer");
require("dotenv").config();
// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.SMTP_PORT,
  secure: false, // upgrade later with STARTTLS
  // service:'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendWebEmail = async (to, subject, html, imgPath) => {
  try {
    const info = await transporter.sendMail({
      from: "amarjeetg050@gmail.com",
      to: [to, "patelarpit2580@gmail.com"],
      bcc: ["amarjeetgupta050@gmail.com"],
      subject,
      html,
      attachments: [
        {
          filename: "flower as attachment",
          contentType: "image/jpeg",
          path: imgPath,
          // cid: "uniqueImageId" // Matches the "cid" in EJS template
        },
      ],
      attachDataUrls: true,
    });

    // console.log("Message sent: %s", info.messageId);
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) console.log("Preview URL: %s", previewUrl);
    return info;
  } catch (err) {
    console.error("Error while sending mail", err);
    throw err; // propagate error
  }
};

module.exports = { sendWebEmail };
