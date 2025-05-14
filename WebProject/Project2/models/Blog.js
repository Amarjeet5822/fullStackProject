const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Blog = sequelize.define("Blog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users', // Name of the User table
        key: 'id', // Primary key of the User table
    },
  }
}, {
  tableName:'blogs',
  timestamps:false,
});

module.exports = Blog;


