const express = require("express");
const router = express.Router();

const dashboard = require("../controllers/dashboard.controller");
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

router.get(
  "/",
  verifyToken,
  checkRole(["mahasiswa","asisten","admin"]),
  dashboard.getDashboard
);

module.exports = router;