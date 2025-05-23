// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const WebhookLog = sequelize.define(
//   "WebhookLog",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     event: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     razorpayEventId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     payload: {
//       type: DataTypes.JSON,
//     },
//     paymentId: {
//       type: DataTypes.INTEGER,
//       allowNull: true, 
//       references: {
//         model: "payments", 
//         key: "id",
//       },
//       onDelete: "SET NULL", // or "CASCADE"
//       onUpdate: "CASCADE",
//     },
//   },
//   {
//     tableName: "webhookLogs",
//     timestamps: false,
//   }
// );

// module.exports = WebhookLog;
