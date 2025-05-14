const express = require("express");
const multer = require("multer");
const path = require("path");
const ExcelJS = require("exceljs");
const { ExcelData } = require("../models/index");

const exportRoute = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/excelData"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1000);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Upload Excel and insert data into DB
exportRoute.post("/", upload.single("excelFile"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const rows = [];
    // console.time("starttime")
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row
      // console.timeEnd("starttime")
      const [
        id, name, email, age, birthdate, created_at, isActive, balance, description
      ] = row.values.slice(1); // ExcelJS rows start at index 1

      rows.push({
        name,
        email,
        age,
        birthdate,
        created_at,
        isActive : isActive === true || isActive==="true" || isActive===1 || isActive==="1" ,
        balance,
        description,
      });
    });
    // console.log("rows >>> ", rows)
    // Insert into DB
    await ExcelData.bulkCreate(rows);

    res.status(201).json({ message: "Excel data imported successfully", count: rows.length, rows });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exportRoute.get("/", async (req, res) => {

});


module.exports = exportRoute;