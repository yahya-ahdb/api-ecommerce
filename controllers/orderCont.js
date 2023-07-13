const Order = require("../models/order");

exports.CreateOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({ ...req.body });
    await newOrder.save();
    res.status(201).send({ success: true, message: "New order" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.GetAllOrder = async (req, res) => {
  try {
    const AllOrder = await Order.find();
    res.status(200).send({ success: true, data: AllOrder });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteOrder = async (req, res) => {
  try {
    console.log(req.params.id);
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
