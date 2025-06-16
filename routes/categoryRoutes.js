const express = require("express");
const router = express.Router();
const {
  insert_category,
  delete_category,
  display_category,
  get_category_by_id,
  update_category,
} = require("../controller/categoryController");


const auth = require("../middleware/jwtAuth");
const isAdmin = require("../middleware/isAdmin");

router.post("/", auth, isAdmin, insert_category);
router.delete("/:id", isAdmin, auth, delete_category);
router.get("/", auth, display_category);
router.get("/:id", auth, get_category_by_id);
router.put("/:id", auth, isAdmin, update_category);

module.exports = router;
