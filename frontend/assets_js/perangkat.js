const express = require("express");

const router = express.Router();

const perangkat = require("../controllers/perangkat.controller");

const verifyToken = require("../middleware/auth.middleware");

const checkRole = require("../middleware/role.middleware");

/* ================= GET ================= */

router.get(
  "/",
  verifyToken,
  checkRole(["mahasiswa","asisten","admin"]),
  perangkat.getAll
);

/* ================= CREATE ================= */

router.post(
  "/",
  verifyToken,
  checkRole(["admin"]),
  perangkat.createPerangkat
);

/* ================= UPDATE ================= */

router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  perangkat.updatePerangkat
);

/* ================= DELETE ================= */

router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  perangkat.deletePerangkat
);

module.exports = router;