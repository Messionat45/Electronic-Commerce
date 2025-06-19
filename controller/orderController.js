const orderItem = require("../models/orderItemModel");
const order = require("../models/orderModel");
const mongoose = require("mongoose");

//creating order basically two table carecareted becaiseu eferecing
const make_order = async (req, res) => {
  try {
    //  here the .map gievs a array of preomiies . so that the raeson we wrap  used promise.all
    const orderItemIds = await Promise.all(
      req.body.oitems.map(async (item) => {
        let newItem = await orderItem.create({
          quantity: item.quantity,
          product: item.product,
        });
        return newItem._id;
      })
    );

    console.log(orderItemIds);

    // total price calculation logic
    const totalPrices = await Promise.all(
      orderItemIds.map(async (item) => {
        const productFind = await orderItem
          .findById(item)
          .populate("product", "price");
        const totalProductPrice =
          productFind.product.price * productFind.quantity;
        return totalProductPrice;
      })
    );

    console.log(totalPrices);

    const totalPrice = totalPrices.reduce((acc, price) => acc + price, 0);

    const orderData = {
      oitems: orderItemIds,
      shippingAddress: req.body.shippingAddress,
      ocity: req.body.ocity,
      ozip: req.body.ozip,
      ocountry: req.body.ocountry,
      ophone: req.body.ophone,
      totalPrice: totalPrice,
      user: req.loggedUser.id,
    };

    const dbData = await order.create(orderData);
    console.log(dbData);
    if (!dbData) return res.status(400).send("incorrect data no dat a");
    return res
      .status(200)
      .json({ message: "order created successfully", dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(" serve issue");
  }
};

//diplay all order
const display_order = async (req, res) => {
  try {
    const dbData = await order.find();
    console.log(dbData);
    if (!dbData) return res.status(400).send("no order data prsesnt ");
    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("some server issue");
  }
};

//display order by id
const display_by_order_id = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("id format wrong");

    const dbData = await order
      .findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "oitems",
        populate: { path: "product", populate: "category" },
      });

    if (!dbData) return res.status(400).send(" no order with given id");
    return res.status(200).json(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(" server issue");
  }
};

//update status of order from oendiing to deilieyd or shipped or out for delivry
const update_status_by_order_id = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("wrong id format");
    const dbData = await order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    if (!dbData) return res.status(400).send("no order with provided id");
    return res.status(200).send(dbData);
  } catch (error) {
    console.log(ErrorEvent.message);
    return res.status(500).send(" serevr issue");
  }
};

//deleting order by id
const delete_by_order_id = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("wrong id format");

    // here this only delets the order table ,
    // but order items table still has data that quantity and pname

    const dbData = await order.findByIdAndDelete(req.params.id);

    if (!dbData)
      return res.status(400).send("no order with provoded is to delete");

    //now i also have to dleete data from orderitem table, below codes also deletes ref table data
    dbData.oitems.map(async (item) => {
      await orderItem.findByIdAndDelete(item);
    });

    return res.status(200).send(dbData);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

module.exports = {
  make_order,
  display_order,
  display_by_order_id,
  update_status_by_order_id,
  delete_by_order_id,
};
