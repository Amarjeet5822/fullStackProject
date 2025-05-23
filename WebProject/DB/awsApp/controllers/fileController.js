const client = require("../routes/awsServices");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const path = require("path");
require('dotenv').config();
const bucketName = process.env.AWS_BUCKET;

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Multer error", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const randomNum = Math.round(Math.random() * 1000);
    const fileExt = path.extname(req.file.originalname);
    const fileName = `file-${randomNum}${fileExt}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,              
      ContentType: req.file.mimetype,
      ACL: "public-read"
    });

    try {
      await client.send(command);
      res.status(200).json({
        message: "File uploaded to S3 successfully",fileName
      });
    } catch (error) {
      console.error("Error uploading to S3:", error);
      res.status(500).json({ message: "S3 upload failed", error });
    }
  });
};


const deleteFile = async (req, res) => {
  const {key} = req.params;
  if (!key) return res.status(400).json({ message: "File key is required" });

  const command = new DeleteObjectCommand({
    Bucket: bucketName, // ✅ replace with your actual bucket
    Key: key,
  });

  try {
    await client.send(command);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting from S3:", error);
    res.status(500).json({ message: "S3 deletion failed", error });
  }
};

module.exports = { uploadFile, deleteFile };