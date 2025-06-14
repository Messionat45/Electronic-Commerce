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
  pbrand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  pcount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 255,
  },

  prating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  pfeatured: {
    type: Boolean,
    default: false,
  },
  pdate: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
