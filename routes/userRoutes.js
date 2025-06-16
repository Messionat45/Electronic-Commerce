const express = require("express");
const router = express.Router();
const { signup } = require("../controller/signupController");
const { login } = require("../controller/loginController");
const { delete_user } = require("../controller/adminController");
const auth = require("../middleware/jwtAuth");
const isAdmin = require("../middleware/isAdmin");

router.post("/signup", signup);
router.post("/login", login);

router.delete("/user/:id", auth, isAdmin, delete_user);

module.exports = router;
