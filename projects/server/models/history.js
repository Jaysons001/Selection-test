"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  History.init(
    {
      userID: DataTypes.INTEGER,
      ClockIn: DataTypes.DATE,
      ClockOut: DataTypes.DATE,
      DaySalary: DataTypes.INTEGER,
      isOvertime: { type: DataTypes.BOOLEAN, defaultValue: true },
      isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "History",
      createdAt: "ClockIn",
    }
  );
  return History;
};
