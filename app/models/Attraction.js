const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const Attraction = sequelize.define("Attraction", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Attraction;
