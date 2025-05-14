const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ExcelData = sequelize.define("ExcelData", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

},
{
  tableName: "dataexcels",
  timestamps: false,

})

module.exports = ExcelData;