const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const historyController = require("../controller/historyController");

router.post("/", verifyToken, historyController.createLog);
router.get("/", verifyToken, historyController.getHistory);
router.patch("/", verifyToken, historyController.updateLog);
router.get("/work", verifyToken, historyController.isWorking);
module.exports = router;
