const express = require("express");
const { uploadFile, deleteFile, getAwsFile, generatePreSignedUrl } = require("../controllers/fileController");

const awsRoute = express.Router();

awsRoute.post("/upload", uploadFile);
awsRoute.get("/", getAwsFile);
awsRoute.delete("/delete/:key", deleteFile);
awsRoute.post("/pre-signed-url", generatePreSignedUrl);

awsRoute.get("/upload-heavy-file", (req, res) => {
  res.render("heavyFileUpload");
})

module.exports = awsRoute;


/**
 * signedUrl : url
 * {
    "url": "https://mybasti.s3.eu-north-1.amazonaws.com/uploads/1747727159825-myfile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAQ3NR3ZXONPXW6WJK%2F20250520%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250520T074559Z&X-Amz-Expires=300&X-Amz-Signature=c77b852a2612be4cec3bff61ca402e331363a13e8d480e673b95e95e92764dc5&X-Amz-SignedHeaders=host&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject",
    "key": "uploads/1747727159825-myfile",
    "bucket": "mybasti",
    "message": "Presigned URL generated successfully"
}
 */

/**
 * {
    "preSignedUrl": {
        "data": {
            "url": "https://s3.ap-south-1.amazonaws.com/cdn-wortal-dev1",
            "fields": {
                "key": "businesses/3/leads/25/docs/iPhone11Render.jpeg",
                "Content-Type": "image/jpeg",
                "acl": "public-read",
                "bucket": "cdn-wortal-dev1",
                "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
                "X-Amz-Credential": "AKIA42PHH5UB55J2Z5NT/20250520/ap-south-1/s3/aws4_request",
                "X-Amz-Date": "20250520T130648Z",
                "Policy": "eyJleHBpcmF0aW9uIjoiMjAyNS0wNS0yMFQxMzoxMTo0OFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MDBdLHsia2V5IjoiYnVzaW5lc3Nlcy8zL2xlYWRzLzI1L2RvY3MvaVBob25lMTFSZW5kZXIuanBlZyJ9LHsiQ29udGVudC1UeXBlIjoiaW1hZ2UvanBlZyJ9LHsiYWNsIjoicHVibGljLXJlYWQifSx7ImJ1Y2tldCI6ImNkbi13b3J0YWwtZGV2MSJ9LHsiWC1BbXotQWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsiWC1BbXotQ3JlZGVudGlhbCI6IkFLSUE0MlBISDVVQjU1SjJaNU5ULzIwMjUwNTIwL2FwLXNvdXRoLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyNTA1MjBUMTMwNjQ4WiJ9XX0=",
                "X-Amz-Signature": "ae4cce22d019fae17bddf161991bff76ced7c61f5f6cff6d3bed55ce6499a496"
            }
        }
    },
    "file": {
        "name": "iPhone11Render.png",
        "extension": "jpeg",
        "business_id": 3,
        "created_by": 2,
        "updated_by": 2,
        "path": "businesses/3/leads/25/docs/iPhone11Render.jpeg",
        "created_at": "2025-05-20T18:36:47.948+05:30",
        "updated_at": "2025-05-20T18:36:47.948+05:30",
        "id": 13,
        "s3_url": "https://s3.ap-south-1.amazonaws.com/cdn-wortal-dev1/businesses/3/leads/25/docs/iPhone11Render.jpeg",
        "parent": {
            "source": "Not Specified",
            "source_id": null,
            "deleted_at": null,
            "parent_name": null
        }
    }
}
    
 */