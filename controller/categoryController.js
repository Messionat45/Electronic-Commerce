const category = require("../models/categoryModel");
const mongoose = require("mongoose");

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

const display_category = async (req, res) => {
  try {
    const dbData = await category.find();
    console.log(dbData);
    if (!dbData) return res.status(400).json({ message: " no data present" });

    return res.status(200).send(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("serevr issue\n", error.message);
  }
};

const delete_category = async (req, res) => {
  try {
    const del = req.params.id;
    if (mongoose.isValidObjectId(del)) {
      return res.status(400).send("no id present");
    }

    const dbData = await category.findByIdAndDelete(del);
    console.log(dbData);
    if (!dbData)
      return res.status(404).json({ message: "no category with given id" });
    return res.status(200).json({ message: " delete successfully", dbData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server issue", message: error.message });
  }
};

const get_category_by_id = async (req, res) => {
  try {
    const dbData = await category.findById(req.params.id);
    console.log(dbData);
    if (!dbData) return res.status(404).send("no data with given id");
    else return res.status(200).send(dbData);
  } catch (error) {
    return res.status(500).send("something went wrong", error.message);
  }
};

const update_category = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("object id id worng");
    }
    const dbData = await category.findByIdAndUpdate(
      req.params.id,
      {
        cname: req.body.cname,
        ccolor: req.body.ccolor,
        cicon: req.body.cicon,
        cimage: req.body.cimage,
      },
      { new: true }
    );
    if (!dbData) return res.status(400).send("no category with given id");
    return res.status(200).send(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(" some server issue", error.message);
  }
};

module.exports = {
  insert_category,
  delete_category,
  display_category,
  get_category_by_id,
  update_category,
};
