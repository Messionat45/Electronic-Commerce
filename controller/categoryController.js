const category = require("../models/categoryModel");

const insert_category = async (req, res) => {
  try {
    const categoryData = req.body;
    console.log(categoryData);

    const dbData = await category.create(categoryData);
    return res
      .status(200)
      .json({ message: "inserted succefully", dbData: dbData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server issue", error: error.message });
  }
};

module.exports = { insert_category };
