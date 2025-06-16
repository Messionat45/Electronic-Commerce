const express = require("express");
const router = express.Router();

const { delete_user } = require("../controller/adminController");
const auth = require("../middleware/jwtAuth");
const isAdmin = require("../middleware/isAdmin");
const { signup } = require("../controller/user/signupController");
const { login } = require("../controller/user/loginController");

router.post("/signup", signup);
router.post("/login", login);

router.delete("/user/:id", auth, isAdmin, delete_user);

module.exports = router;
