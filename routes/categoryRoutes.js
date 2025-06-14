const express = require("express");
const router = express.Router();
const {
  insert_category,
  delete_category,
  display_category,
  get_category_by_id,
  update_category,
} = require("../controller/categoryController");

router.post("/category", insert_category);
router.delete("/category/:id", delete_category);
router.get("/category", display_category);
router.get("/category/:id", get_category_by_id);
router.put("/category/:id", update_category);

module.exports = router;
