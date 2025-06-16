const express = require("express");
const router = express.Router();
const {
  insert_category,
  delete_category,
  display_category,
  get_category_by_id,
  update_category,
} = require("../controller/categoryController");

router.post("/", insert_category);
router.delete("/:id", delete_category);
router.get("/", display_category);
router.get("/:id", get_category_by_id);
router.put("/:id", update_category);

module.exports = router;
