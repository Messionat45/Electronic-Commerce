const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

const orderItem = mongoose.model("orderItem", orderItemSchema);
module.exports = orderItem;
