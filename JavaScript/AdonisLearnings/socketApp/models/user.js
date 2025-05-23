"use strict";
const istDate = require('../utils/timeIST');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message, { foreignKey: "senderId", as: "sentMessages" });
      User.hasMany(models.Message, {
        foreignKey: "receiverId",
        as: "receivedMessages",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      socketId: DataTypes.STRING,
      isBoolean: DataTypes.BOOLEAN,
      lastSeen:{
        type: DataTypes.Date,
        defaultValue: istDate
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
