const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true,
  },
  ccolor: {
    type: String,
  },
  cicon: {
    type: String,
    required: false,
    default: "white",
  },
  cimage: {
    type: String,
    required: false,
  },
});

const category = mongoose.model("category", categorySchema);
module.exports = category;
