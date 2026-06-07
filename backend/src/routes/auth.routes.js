const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

// login
router.post("/login", auth.login);

// register
router.post("/register", auth.register);

module.exports = router;