const express = require("express");
const router = express.Router();
const { make_order } = require("../controller/orderController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/jwtAuth");

router.post("/order", auth, make_order);

module.exports = router;
