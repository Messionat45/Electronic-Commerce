const user = require("../models/userModel");
const signup = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      zip: req.body.zip,
      state: req.body.state,
      country: req.body.country,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
    };

    const dbData = await user.create(data);
    if (!dbData) return res.status(400).send("plz fill data properly");

    return res.status(200).json({ message: " data inserted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("serve issue");
  }
};

module.exports = { signup };
