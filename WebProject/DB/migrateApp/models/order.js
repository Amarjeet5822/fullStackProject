// const { DataTypes, ENUM } = require("sequelize");
// const sequelize = require("../config/db");

// const Order = sequelize.define("Order", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   razorpayOrderId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   amount: {
//     type: DataTypes.DECIMAL(10,2),
//     allowNull: false,
//   },
//   currency: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   ENUM: {
//     type: DataTypes.ENUM("created", "paid", "failed"),
//     defaultValue: "created"
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//         model: 'users', // Name of the User table
//         key: 'id', // Primary key of the User table
//     },
//   }
// }, {
//   tableName:'orders',
//   timestamps:false,
// });

// module.exports = Order;


