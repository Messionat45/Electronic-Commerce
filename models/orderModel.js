const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  oitems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orderItem",
      required: true,
    },
  ],
  shippingAddress: {
    type: String,
    require: true,
  },
  ocity: {
    type: String,
    require: true,
  },
  ozip: {
    type: Number,
    required: true,
  },
  ocountry: {
    type: String,
    required: true,
  },
  ophone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

const order = mongoose.model("order", orderSchema);
module.exports = order;
