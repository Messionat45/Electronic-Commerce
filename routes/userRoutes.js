const express = require("express");
const router = express.Router();
const { signup } = require("../controller/user/signupController");
const { login } = require("../controller/user/loginController");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
