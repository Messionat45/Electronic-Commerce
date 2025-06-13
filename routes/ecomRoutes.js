const express = require("express");
const router = express.Router();
const { insert_category } = require("../controller/categoryController");

router.post("/category", insert_category);

module.exports = router;
