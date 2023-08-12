const db = require("../../models");
const { Op } = require("sequelize");
const path = require("path");
const { User, History } = db;

function cekOvertime(date1, date2) {
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());
  return timeDifference > 12 * 60 * 60 * 1000;
}

const historyController = {
  createLog: async (req, res) => {
    const { id } = req.user;
    try {
      db.sequelize.transaction(async (t) => {
        const log = await History.create({ userID: id, isOvertime: true });
        const user = await User.findByPk(id);
        log.DaySalary = user.baseSalary / 30 / 2;
        await log.save(), { transaction: t };
        return res.status(200).json({ message: "success", log });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  updateLog: async (req, res) => {
    const { id } = req.user;
    try {
      db.sequelize.transaction(async (t) => {
        const log = await History.findOne({
          where: { userID: id },
          order: [["ClockIn", "DESC"]],
        });
        log.ClockOut = new Date();
        if (cekOvertime(log.ClockIn, log.ClockOut)) log.isOvertime = true;
        else log.isOvertime = false;
        log.isDone = true;
        await log.save(), { transaction: t };
        return res.status(200).json({ message: "success", log });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  getHistory: async (req, res) => {
    try {
      const { id } = req.user;
      console.log(id);
      const result = await History.findAll({
        where: { userID: id },
        order: [["ClockIn", "DESC"]],
      });
      return res.status(200).json({ message: "success", result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  isWorking: async (req, res) => {
    try {
      const { id } = req.user;
      let result = await History.findOne({
        where: { userID: id, isDone: false },
        order: [["ClockIn", "DESC"]],
      });
      return res.status(200).json({ message: "success", result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },
};

module.exports = historyController;
