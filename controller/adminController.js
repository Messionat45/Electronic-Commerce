const user = require("../models/userModel");
const mongoose = require("mongoose");

const delete_user = async (req, res) => {
  try {
    console.log(req.params.id);
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("wrong id format for user deletion");

    const dbData = await user.findByIdAndDelete(req.params.id);

    if (!dbData) return res.status(400).send("user ID not present");
    return res.status(200).json({ message: "succefullt deleetd", dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("serve issuse");
  }
};

module.exports = { delete_user };
