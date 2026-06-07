const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware");

router.get("/", verifyToken, user.getAll);
router.post("/", verifyToken, user.create);
console.log("user:", user);
console.log("getAll:", typeof user.getAll);
// matikan dulu
//router.put("/:id", verifyToken, user.update);
//router.delete("/:id", verifyToken, user.remove);

module.exports = router;