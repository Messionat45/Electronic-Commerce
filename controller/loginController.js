const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtKey = process.env.JWT_KEY;
console.log("jwt key:", jwtKey);

const login = async (req, res) => {
  try {
    console.log("i am in login");
    const uEmail = req.body.email.toLowerCase();

    const checkUser = await user.findOne({
      email: uEmail,
    });
    console.log(checkUser);

    if (!checkUser)
      return res.status(400).send("user doesent exists,  sign up first");

    const passCheck = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (!passCheck) return res.status(400).send("password is incorrect");

    const jwtToken = jwt.sign(
      {
        id: checkUser._id,
        name: checkUser.name,
        isAdmin: checkUser.isAdmin,
      },
      jwtKey,
      { expiresIn: 60 * 5 * 1000 }
    );

    console.log(jwtToken);
    res.cookie("token", jwtToken, {
      maxAge: 60 * 5 * 1000,
      httpOnly: true,
      secure: true,
    });

    return res
      .status(200)
      .json({ message: `hello ${checkUser.name}, logged in successfully` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};
module.exports = { login };
