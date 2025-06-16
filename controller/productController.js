const product = require("../models/productModel");
const category = require("../models/categoryModel");
const mongoose = require("mongoose");

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

const update_product = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("some issue with the id format");
    const categoryId = await category.findById(req.body.category);
    if (!categoryId)
      return res.status(400).send("category is not present in db");
    const dbData = await product.findByIdAndUpdate(req.params.id, {
      pname: req.body.pname,
      pimage: req.body.pimage,
      pbrand: req.body.pbrand,
      price: req.body.price,
      category: req.body.category,
      pcount: req.body.pcount,
      prating: req.body.prating,
      pfeatured: req.body.pfeatured,
    });
    console.log(dbData);
    if (!dbData) return res.status(400).send("cant find product with given id");

    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
  }
};

const delete_product = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("id format is wrong");
    }
    const dbData = await product.findByIdAndDelete(req.params.id);
    console.log(dbData);
    if (!dbData) return res.status(400).send("give id data is not present");

    return res.status(200).json({ message: "successfully deleted ", dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

//get count of proeduct avaialable
const product_count = async (req, res) => {
  try {
    const productCount = await product.countDocuments();

    console.log(productCount);
    return res.status(200).json({ product_Count: productCount });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

//  featured product
const featured_product = async (req, res) => {
  try {
    const dbData = await product.find({ pfeatured: true });
    console.log(dbData);
    if (!dbData) return res.status(400).send("no featured product avialable");
    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

//filtering by sinle category
const product_by_category = async (req, res) => {
  try {
    const dbData = await product.find({ category: req.params.id });
    if (!dbData) return res.status(400).send("no product with give category");
    return res.status(200).json(dbData);
  } catch (error) {
    return res.status(500).send("server isuue");
  }
};

//filtering by id but multiple category filter query sending
const multi_category_product = async (req, res) => {
  try {
    let filter = {};

    if (req.query.categories) {
      filter = {
        category: req.query.categories.split(","),
      };
    }

    const productList = await product.find(filter).populate("category");
    console.log(productList);
    return res.status(200).json(productList);
  } catch (error) {
    console.log("error.message");
    return res.status(500).send("server issue");
  }
};


module.exports = {
  insert_product,
  display_product,
  get_product_by_id,
  display_name_image,
  show_full_categoy,
  update_product,
  delete_product,
  product_count,
  featured_product,
  product_by_category,
  multi_category_product,
};
