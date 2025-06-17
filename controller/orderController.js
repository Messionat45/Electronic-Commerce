const orderItem = require("../models/orderItemModel");
const order = require("../models/orderModel");

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

    const orderData = {
      oitems: orderItemIds,
      shippingAddress: req.body.shippingAddress,
      ocity: req.body.ocity,
      ozip: req.body.ozip,
      ocountry: req.body.ocountry,
      ophone: req.body.ophone,
      totalPrice: req.body.totalPrice,
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

module.exports = { make_order };
