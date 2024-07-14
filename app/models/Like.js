const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");
const User = require("./User");
const Attraction = require("./Attraction");

const Like = sequelize.define(
  "Like",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    attraction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Attraction,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Like;
