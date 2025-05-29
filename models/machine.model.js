const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Region = require("./region.model");
const District = require("./district.model");
const User = require("./user.models");
const Category = require("./category.model");

const Machine = sequelize.define(
  "machine",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_per_hour: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    min_hour: {
      type: DataTypes.STRING,
    },
    min_price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
  }
);

Region.hasMany(Machine);
Machine.belongsTo(Region);

District.hasMany(Machine);
Machine.belongsTo(District);

User.hasMany(Machine);
Machine.belongsTo(User);

Category.hasMany(Machine);
Machine.belongsTo(Category);


module.exports = Machine;
