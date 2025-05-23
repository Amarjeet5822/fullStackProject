const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blogId:{
    type:DataTypes.INTEGER,
    references: {
      model: "blogs",
      key: "id"
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references:{
      model: "users",
      key:"id"
    }
  }
}, {
  tableName:"comments",
  timestamps:false
});

module.exports = Comment;