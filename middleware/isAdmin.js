const isAdmin = async (req, res, next) => {
  try {
    const data = req.loggedUser;
    console.log(data);
    if (data.isAdmin) next();
    else return res.status(400).send("access denied u are not an admin");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some error issue ");
  }
};

module.exports = isAdmin;
