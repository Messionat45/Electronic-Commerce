const express = require("express");
const {
  insert_product,
  display_product,
  get_product_by_id,
  display_name_image,
  show_full_categoy,
} = require("../controller/productController");
const router = express.Router();

router.post("/product", insert_product);
router.get("/product", display_product);

router.get("/product/nameimage", display_name_image);

router.get("/product/fullCategory", show_full_categoy); // to show referenced table whole details
router.get("/product/:id", get_product_by_id);

module.exports = router;
