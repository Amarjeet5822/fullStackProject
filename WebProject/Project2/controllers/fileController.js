const client = require("../services/awsServices");
const {
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const bucketName = process.env.AWS_BUCKET;

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadFile = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const randomNum = Math.round(Math.random() * 100000);
    const fileExt = path.extname(req.file.originalname);
    const fileName = `file-${randomNum}${fileExt}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    try {
      const fileUploaded = await client.send(command);
      console.log("line 33 fileUplaoded ???", fileUploaded);
      res.status(200).json({
        message: "File uploaded to S3 successfully",
        fileName,
      });
    } catch (error) {
      console.error("Error uploading to S3:", error);
      res.status(500).json({ message: "S3 upload failed", error });
    }
  });
};

const getAwsFile = async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });

    const response = await client.send(command);

    if (!response.Contents) {
      return res.status(200).json({ message: "No files found", files: [] });
    }
    const files = response.Contents.map((item) => {
      console.log("item as response of each  file >>> :::", item);
      return {
        key: item.Key,
        url: `https://${bucketName}.s3.amazonaws.com/${item.Key}`,
      };
    });

    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching files from S3:", error);
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};
const deleteFile = async (req, res) => {
  const { key } = req.params;
  if (!key) return res.status(400).json({ message: "File key is required" });

  const command = new DeleteObjectCommand({
    Bucket: bucketName,
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

const generatePreSignedUrl = async (req, res) => {
  try {
    const { filename, type } = req.query;
    console.log("filename, fileType>>::", filename, type);
    if (!filename || !type) {
      return res
        .status(400)
        .json({ message: "filename and type are required" });
    }

    const key = `uploads/${Date.now()}-${filename}`;

    const { url, fields } = await createPresignedPost(client , {
      Bucket: bucketName,
      Key: key,
      Conditions: [
        ["starts-with", "$Content-Type", ""],
        { acl: "public-read" },
      ],
      Fields: {
        "Content-Type": type,
        acl: "public-read",
      },
      Expires: 300, // seconds
    });
    fields.key = key;
    fields.bucket = bucketName;
    // const fileUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;
    res.status(200).json({
      fields,
      url,
      message: "Presigned URL generated successfully",
    });
  } catch (err) {
    console.error("Error generating presigned URL", err);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
};
module.exports = { uploadFile, deleteFile, getAwsFile, generatePreSignedUrl };
