const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const auth = async (req, res, next) => {
  const jwtToken = req.cookies.token;

  console.log(jwtToken);

  if (!jwtToken)
    return res.status(400).send("no token exixt, need to login again");

  try {
    const isValidUser = jwt.verify(jwtToken, jwtKey);

    console.log(isValidUser);

    if (!isValidUser)
      return res
        .status(400)
        .send("token is tempered wong user, eed to loginagain");

    req.loggedUser = isValidUser;
    console.log(req.loggedUser);
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(" smething went worng in server");
  }
};

module.exports = auth;
