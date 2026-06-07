const express = require("express");
const router = express.Router();

const kerusakan = require("../controllers/kerusakan.controller");

const verifyToken = require("../middleware/auth.middleware");
const checkRole = require("../middleware/role.middleware");

/* LIHAT DATA */
router.get(
  "/",
  verifyToken,
  checkRole(["admin","asisten"]),
  kerusakan.getAll
);

/* TAMBAH DATA */
router.post(
  "/",
  verifyToken,
  checkRole(["admin","asisten"]),
  kerusakan.create
);

/* EDIT DATA */
router.put(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  kerusakan.update
);

/* HAPUS DATA */
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  kerusakan.remove
);

module.exports = router;