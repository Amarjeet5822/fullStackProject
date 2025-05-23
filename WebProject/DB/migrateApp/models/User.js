// models/User.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config1/db");

// const User = sequelize.define("User", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: true
//     }
//   },
//   {
//     tableName: "users",
//     timestamps: false,
//     underscored: false,
//     // updatedAt: true,
//     // createdAt: true,
//   }
// );

// User.associate = (models) => {
//     User.hasMany(models.Blog, { foreignKey: "userId", as: "blogs" });
//   };

// module.exports = User;


// 'use strict';
// models/user.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // associations
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};


