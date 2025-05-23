// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Blog = sequelize.define(
//   "Blog",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     content: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "users", // Name of the User table
//         key: "id", // Primary key of the User table
//       },
//       onDelete: "CASCADE",
//     },
//   },
//   {
//     tableName: "blogs",
//     timestamps: true,
//     underscored: false,
//   }
// );

// Blog.associate = (models) => {
//   Blog.belongsTo(models.User, { foreignKey: "userId", as: "author" });
// };

// module.exports = Blog;
