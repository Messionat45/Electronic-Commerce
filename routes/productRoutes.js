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

router.post("/", insert_product);
router.get("/", display_product);
router.get("/nameimage", display_name_image);
router.get("/fullCategory", show_full_categoy); // to show referenced table whole details
router.put("/:id", update_product);
router.get("/count", product_count);
router.get("/featured", featured_product);
router.get("/category/:id", product_by_category);
router.get("/multicategory", multi_category_product);
router.get("/:id", get_product_by_id);
router.delete("/:id", delete_product);

module.exports = router;
