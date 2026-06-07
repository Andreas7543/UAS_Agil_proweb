const express = require("express");
const router = express.Router();
const jadwal = require("../controllers/jadwal.controller");
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

/* ================= GET ================= */
router.get(
  "/",
  verifyToken,
  checkRole(["mahasiswa","asisten","admin"]),
  jadwal.getAll
);

/* ================= CREATE ================= */
router.post(
  "/",
  verifyToken,
  checkRole(["admin", "asisten"]),
  jadwal.create
);

/* ================= UPDATE ================= */
router.put(
  "/:id",
  verifyToken,
  checkRole(["asisten","admin"]),
  jadwal.update
);

/* ================= DELETE ================= */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  jadwal.remove
);
module.exports = router;