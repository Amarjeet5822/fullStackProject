const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();


const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;
const awsRegion = process.env.AWS_REGION;

const client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey
  }
});

module.exports = client;