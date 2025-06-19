const user = require("../models/userModel");
const mongoose = require("mongoose");
const order = require("../models/orderModel");

const delete_user = async (req, res) => {
  try {
    console.log(req.params.id);
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).send("wrong id format for user deletion");

    const dbData = await user.findByIdAndDelete(req.params.id);

    if (!dbData) return res.status(400).send("user ID not present");
    return res.status(200).json({ message: "succefullt deleetd", dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("serve issuse");
  }
};

//calculating overall sales using group and sum
const admin_Total_Sales_display = async (req, res) => {
  try {
    const dbData = await order.find().select("totalPrice");
    const totalSales = await order.aggregate([
      { $group: { _id: null, totalOverallSales: { $sum: "$totalPrice" } } },
    ]);
    // id col s must here beasue mongiose cannot retuen nay table without id so id must be theire
    if (!totalSales) return res.status(400).send("no sles exists");
    console.log(totalSales);

    //to show te reslu without array
    const total = { totalSales: totalSales.pop().totalOverallSales };

    console.log(total); //without array bracket

    return res.status(200).send(total);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server isuue");
  }
};

// total no of ordeers in overall ecom app
const total_orders_count = async (req, res) => {
  try {
    dbData = await order.countDocuments();
    console.log(dbData);

    if (!dbData) return res.status(400).send("no orders");
    return res.status(200).send({ totalOrders: dbData });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("server issue");
  }
};

module.exports = { delete_user, admin_Total_Sales_display, total_orders_count };
