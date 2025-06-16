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

router.post("/product", auth, isAdmin, insert_product);
router.get("/product", auth, display_product);
router.get("/product/nameimage", auth, display_name_image);
router.get("/product/fullCategory", auth, show_full_categoy); // to show referenced table whole details
router.put("/product/:id", auth, update_product);
router.get("/product/count", auth, product_count);
router.get("/product/featured", auth, featured_product);
router.get("/product/category/:id", auth, product_by_category);
router.get("/product/multicategory", auth, multi_category_product);
router.get("/product/:id", auth, get_product_by_id);
router.delete("/product/:id", auth, isAdmin, delete_product);

module.exports = router;
