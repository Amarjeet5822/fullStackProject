const express = require("express");
const ExcelJS = require("exceljs");
const { ExcelData } = require("../models/index");
const path = require("path");

const importRoute = express.Router();

importRoute.get("/", async (req, res) => {
  try {
    console.log("Route hit at", new Date().toISOString());
    const dummyData = await ExcelData.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Excel Data");

    if (dummyData.length > 0) {
      const columns = Object.keys(dummyData[0].dataValues).map(key => ({
        header: key,
        key: key,
        width: 15,
      }));

      worksheet.columns = columns;

      dummyData.forEach((item) => {
        worksheet.addRow(item.dataValues);
      });
    }

    const fileName = `excel_data_${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, "../uploads/excelData", fileName);

    await workbook.xlsx.writeFile(filePath);

    res.status(200).json({
      message: "Excel file created successfully",
      filePath: `/uploads/excelData/${fileName}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

importRoute.post("/", async (req, res) => {
  try {
    const dummyData = await ExcelData.bulkCreate(req.body);
    res.status(201).json(dummyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = importRoute;