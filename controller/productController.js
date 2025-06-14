const product = require("../models/productModel");
const category = require("../models/categoryModel");

const insert_product = async (req, res) => {
  try {
    const categoryId = await category.findById(req.body.category);
    console.log(categoryId);

    if (!categoryId)
      return res.status(400).send("wrong id which doesnt exist in our db");

    const data = {
      pname: req.body.pname,
      pimage: req.body.pimage,
      pbrand: req.body.pbrand,
      price: req.body.price,
      category: req.body.category,
      pcount: req.body.pcount,
      prating: req.body.prating,
      pfeatured: req.body.pfeatured,
    };

    const dbData = await product.create(data);
    console.log(dbData);

    if (!dbData) return res.status(400).send("some issue while inserting");
    else
      return res.status(200).json({ message: "inserted successfully", dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue", error.message);
  }
};

const display_product = async (req, res) => {
  try {
    const dbData = await product.find();
    if (!dbData) return res.status(400).send("database is empty");

    return res.status(200).json(dbData);
  } catch (error) {
    return res.status(500).send("server issue");
  }
};

const get_product_by_id = async (req, res) => {
  try {
    const dbData = await product.findById(req.params.id);
    console.log(dbData);
    if (!dbData) return res.status(400).send("kind find product with given id");

    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

//only dipslay name and img of product
const display_name_image = async (req, res) => {
  try {
    const dbData = await product.find().select("pname pimage -_id"); //-_id when u dont want id to be prinetd
    if (!dbData) return res.status(400).send("database is empty");
    console.log(dbData);
    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

//to show whole content of vategory table at referceed product table data
const show_full_categoy = async (req, res) => {
  try {
    const dbData = await product.find().populate("category"); // populate give whole tab;e detaild of refercedn tablle ( here category is refereced table)
    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

module.exports = {
  insert_product,
  display_product,
  get_product_by_id,
  display_name_image,
  show_full_categoy,
};
