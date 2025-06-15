const express = require("express");
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
const router = express.Router();

router.post("/product", insert_product);
router.get("/product", display_product);
router.get("/product/nameimage", display_name_image);
router.get("/product/fullCategory", show_full_categoy); // to show referenced table whole details
router.put("/product/:id", update_product);
router.get("/product/count", product_count);
router.get("/product/featured", featured_product);
router.get("/product/category/:id", product_by_category);
router.get("/product/multicategory", multi_category_product);
router.get("/product/:id", get_product_by_id);
router.delete("/product/:id", delete_product);

module.exports = router;
