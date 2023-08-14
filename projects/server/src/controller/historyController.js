const db = require("../../models");
const { Op } = require("sequelize");
const path = require("path");
const { User, History } = db;

function getMonthSalary(id, month) {
  return {
    attributes: [
      [db.sequelize.fn("SUM", db.sequelize.col("DaySalary")), "totalDaySalary"],
      [db.sequelize.fn("MONTH", db.sequelize.col("ClockIn")), "month"],
      [db.sequelize.fn("COUNT", db.sequelize.col("isDone")), "isDoneCount"],
      [
        db.sequelize.fn("SUM", db.sequelize.literal("CASE WHEN isOvertime = true THEN 1 ELSE 0 END")),
        "banyakGajiTerpotong",
      ],
      [
        db.sequelize.fn("SUM", db.sequelize.literal("CASE WHEN isOvertime = true THEN DaySalary ELSE 0 END")),
        "GajiTerpotong",
      ],
    ],
    group: ["isDone", "month"],
    where: {
      userID: id,
      isDone: true,
      [Op.and]: [db.sequelize.where(db.sequelize.fn("MONTH", db.sequelize.col("ClockIn")), month)],
    },
    order: [[db.sequelize.fn("MONTH", db.sequelize.col("ClockIn")), "DESC"]],
  };
}

function getYearlySalary(id, year) {
  return {
    attributes: [
      [db.sequelize.fn("SUM", db.sequelize.col("DaySalary")), "totalDaySalary"],
      [db.sequelize.fn("YEAR", db.sequelize.col("ClockIn")), "year"],
      [db.sequelize.fn("COUNT", db.sequelize.col("isDone")), "isDoneCount"],
      [
        db.sequelize.fn("SUM", db.sequelize.literal("CASE WHEN isOvertime = true THEN 1 ELSE 0 END")),
        "banyakGajiTerpotong",
      ],
      [
        db.sequelize.fn("SUM", db.sequelize.literal("CASE WHEN isOvertime = true THEN DaySalary ELSE 0 END")),
        "GajiTerpotong",
      ],
    ],
    group: ["isDone", "year"],
    where: {
      userID: id,
      isDone: true,
      [Op.and]: [db.sequelize.where(db.sequelize.fn("YEAR", db.sequelize.col("ClockIn")), year)],
    },
  };
}

function cekOvertime(date1, date2) {
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());
  return timeDifference > 12 * 60 * 60 * 1000;
}

function getJamKerja(date1, date2) {
  const timeDifference = Math.abs(date1.getTime() - date2.getTime());
  const hoursDifference = timeDifference / (60 * 60 * 1000);
  const hours = Math.floor(hoursDifference);
  return hours;
}

const setPagination = (limit, page) => {
  const offset = (page - 1) * +limit;
  return { limit: parseInt(limit), offset };
};

const historyController = {
  createLog: async (req, res) => {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    const lagiKerja = await History.findOne({ where: { userID: id, isDone: false }, order: [["ClockIn", "DESC"]] });
    if (lagiKerja) return res.status(400).json({ message: "Kamu Lagi Bekerja, Ngapain Check In Lagi" });
    try {
      db.sequelize.transaction(async (t) => {
        const log = await History.create({ userID: id, isOvertime: true }, { transaction: t });
        return res.status(200).json({ message: "success", log });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  updateLog: async (req, res) => {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    try {
      db.sequelize.transaction(async (t) => {
        const log = await History.findOne({ where: { userID: id, isDone: false }, order: [["ClockIn", "DESC"]] });
        if (!log) return res.status(400).json({ message: "Kamu Belum Bekerja / Check In" });
        log.ClockOut = new Date();
        log.DaySalary = user.baseSalary / 30;
        if (cekOvertime(log.ClockIn, log.ClockOut)) {
          log.isOvertime = true;
          log.DaySalary *= 0.5;
        } else {
          log.isOvertime = false;
          log.DaySalary *= getJamKerja(log.ClockIn, log.ClockOut) / 8;
        }
        log.isDone = true;
        user.isLogin = false;
        await user.save(), await log.save(), { transaction: t };
        return res.status(200).json({ message: "success", log });
      });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  },

  getHistory: async (req, res) => {
    const { limit = 8, page = 1, order = "DESC", orderBy = "ClockIn", startDate, endDate } = req.query;
    let filter = {};
    if (startDate && endDate) {
      filter = { [Op.and]: [{ ClockIn: { [Op.between]: [new Date(startDate), new Date(endDate)] } }] };
    }
    const { id } = req.user;
    const pagination = setPagination(limit, page);
    const totalHistory = await History.count({ where: { userID: id, ...filter } });
    const totalPage = Math.ceil(totalHistory / +limit);

    try {
      const result = await History.findAll({
        where: { userID: id, ...filter },
        order: [[orderBy, order]],
        ...pagination,
      });
      const coba = { page, limit, totalHistory, totalPage, result };
      return res.status(200).json({ message: "success", ...coba });
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

  getMonth: async (req, res) => {
    try {
      const { id } = req.user;
      const { month, year } = req.query;
      let clause = {};
      if (month) clause = getMonthSalary(id, month);
      else if (year) clause = getYearlySalary(id, year);

      let result = await History.findOne({
        ...clause,
      });
      return res.status(200).json({ message: "success", result });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  },
};

module.exports = historyController;
