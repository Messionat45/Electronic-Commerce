const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  oname: {
    type: String,
    required: true,
  },
  ocolor: {
    type: String,
    required: false,
  },
  oicon: {
    type: String,
  },
  oimage: {
    type: String,
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
