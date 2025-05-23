const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  razorpayPaymentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razorpaySignature: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ENUM: {
    type: DataTypes.ENUM("success", "failed"),
    defaultValue: "success"
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'orders', // Name of the Order table
        key: 'id', // Primary key of the Order table
    },
  }
}, {
  tableName:'payments',
  timestamps:false,
});

module.exports = Payment;


