const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  pimage: {
    type: String,
    default: "",
  },
  pcount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
