const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Role;
