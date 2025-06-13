const mongoose = require("mongoose");
const dbURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("conn to database ecommerce");
  } catch (error) {
    console.log("some error", error.meassage);
  }
};

module.exports = connectDB;
