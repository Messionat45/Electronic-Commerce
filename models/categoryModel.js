const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({});

const category = mongoose.model("category", categorySchema);
module.exports = category;
