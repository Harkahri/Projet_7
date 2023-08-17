const express = require("express");
const userCtrl = require("../controllers/user");

const router = express.Router();

router.post("/auth/signup", userCtrl.signup);
router.post("/auth/login", userCtrl.login);

module.exports = router;
