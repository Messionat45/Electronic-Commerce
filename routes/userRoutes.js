const express = require("express");
const router = express.Router();
const { signup } = require("../controller/signupController");
const { login } = require("../controller/loginController");
const {
  delete_user,
  admin_Total_Sales_display,
  total_orders_count,
} = require("../controller/adminController");
const auth = require("../middleware/jwtAuth");
const isAdmin = require("../middleware/isAdmin");

router.post("/signup", signup);
router.post("/login", login);

router.delete("/user/:id", auth, isAdmin, delete_user);
router.get("/totalsales", auth, isAdmin, admin_Total_Sales_display);
router.get("/totalorders", auth, isAdmin, total_orders_count);
module.exports = router;
