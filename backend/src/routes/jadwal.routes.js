const express = require("express");
const router = express.Router();

const jadwal = require("../controllers/jadwal.controller");
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

/* MAHASISWA, ASISTEN, ADMIN */
router.get(
  "/",
  verifyToken,
  checkRole(["mahasiswa","asisten","admin"]),
  jadwal.getAll
);

/* ASISTEN & ADMIN */
router.post(
  "/",
  verifyToken,
  checkRole(["asisten","admin"]),
  jadwal.create
);

/* ASISTEN & ADMIN */
router.put(
  "/:id",
  verifyToken,
  checkRole(["asisten","admin"]),
  jadwal.update
);

/* ADMIN */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  jadwal.remove
);

module.exports = router;