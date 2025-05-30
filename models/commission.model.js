const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Commission = sequelize.define(
  "commission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Commission;
