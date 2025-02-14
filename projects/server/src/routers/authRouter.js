const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const authController = require("../controller/authController");

router.post("/", authController.login);
router.get("/", verifyToken, authController.cekUser);
router.post("/reg", verifyToken, authController.registerEmployee);
router.get("/all", verifyToken, authController.getAll);
router.patch("/reg", verifyToken, authController.registerLanjutan);
router.get("/role", authController.getRole);
module.exports = router;
