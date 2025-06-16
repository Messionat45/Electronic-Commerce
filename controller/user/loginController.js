const user = require("../../models/userModel");
require('dotenv').config();

const login = async (req, res) => {
  console.log(req);
  try {
    return res.status(200).json({ message: "logged in successfully" });

  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

module.exports = { login };
