const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Machine = require("./machine.model");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img_url: {
      type: DataTypes.STRING(500),
    },
    uploaded_at: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

Machine.hasMany(Image);
Image.belongsTo(Machine);

module.exports = Image;
