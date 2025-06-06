'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {
        foreignKey: "userId"
      })
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Name of the User table
        key: "id", // Primary key of the User table
      },
      onDelete: "CASCADE",
    },
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: "blogs",
  });
  return Blog;
};