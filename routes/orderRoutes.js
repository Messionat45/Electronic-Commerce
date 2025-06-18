const express = require("express");
const router = express.Router();
const {
  make_order,
  display_order,
  display_by_order_id,
  update_status_by_order_id,
  delete_by_order_id,
} = require("../controller/orderController");
const isAdmin = require("../middleware/isAdmin");
const auth = require("../middleware/jwtAuth");

router.post("/order", auth, make_order);
router.get("/order", auth, display_order);

router.put("/order/:id", auth, isAdmin, update_status_by_order_id);
router.get("/order/:id", auth, display_by_order_id);

router.delete("/order/:id", auth, delete_by_order_id);

module.exports = router;
