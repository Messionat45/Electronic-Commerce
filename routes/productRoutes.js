const express = require("express");
const router = express.Router();
const {
  insert_product,
  display_product,
  get_product_by_id,
  display_name_image,
  show_full_categoy,
  update_product,
  delete_product,
  product_count,
  featured_product,
  product_by_category,
  multi_category_product,
} = require("../controller/productController");

const auth = require("../middleware/jwtAuth");
const isAdmin = require("../middleware/isAdmin");

router.post("/", auth, isAdmin, insert_product);
router.get("/", auth, display_product);
router.get("/nameimage", auth, display_name_image);
router.get("/fullCategory", auth, show_full_categoy); // to show referenced table whole details
router.put("/id", auth, update_product);
router.get("/count", auth, product_count);
router.get("/featured", auth, featured_product);
router.get("/category/:id", auth, product_by_category);
router.get("/multicategory", auth, multi_category_product);
router.get("/id", auth, get_product_by_id);
router.delete("/:id", auth, isAdmin, delete_product);

module.exports = router;
