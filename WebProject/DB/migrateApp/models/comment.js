// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Comment = sequelize.define("Comment", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   blogId:{
//     type:DataTypes.INTEGER,
//     references: {
//       model: "blogs",
//       key: "id"
//     },
//     onDelete: "CASCADE"
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references:{
//       model: "users",
//       key:"id"
//     },
//     onDelete: "CASCADE",
//   }
// }, {
//   tableName:"comments",
//   underscored: true,
//   timestamps:true,
// });

// module.exports = Comment;

