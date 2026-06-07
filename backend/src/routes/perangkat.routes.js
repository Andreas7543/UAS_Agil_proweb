const express = require("express");
const router = express.Router();

const perangkat = require("../controllers/perangkat.controller");
const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

/* ===== AKSES SEMUA (lihat data) ===== */
router.get(
  "/",
  verifyToken,
  checkRole(["asisten","admin"]),
  perangkat.getAll
);

/* ===== KHUSUS ADMIN ===== */
router.post(
  "/",
  verifyToken,
  checkRole(["admin"]),
  perangkat.create
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  perangkat.update
);

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  perangkat.remove
);

module.exports = router;