const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");
const User = require("./user.models");

const Review = sequelize.define(
  "review",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Machine.hasMany(Review);
Review.belongsTo(Machine);

User.hasMany(Review);
Review.belongsTo(User);

module.exports = Review;
