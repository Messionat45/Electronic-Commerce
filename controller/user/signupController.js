const user = require("../../models/userModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const userCheck = await user.findOne({
      email: req.body.email.toLowerCase(),
    });
    console.log(userCheck);
    if (userCheck) return res.status(400).send("acc already exixts");
    const data = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: await bcrypt.hash(req.body.password, 10),
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
    console.log(error.errmsg);
    return res.status(500).send("serve issue");
  }
};

module.exports = { signup };
