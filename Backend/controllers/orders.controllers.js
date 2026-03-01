const Order = require("../models/orders.model");

const createOrder = async (req, res) => {
  const newOrder = req.body;
  const order = new Order(newOrder);
  try {
    const addedOrder = await order.save(order);
    console.log("Order Placed successfully");
    res
      .status(200)
      .json({ message: "Order Placed successfully", data: addedOrder });
  } catch (error) {
    console.error("database error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.find({ uid: id });
    if (orders.length === 0) {
      console.log();
      return res.status(404).json({ message: "no orders were found" });
    }
    return res
      .status(200)
      .json({ message: "order fetched successfully", data: orders });
  } catch (error) {
    console.log("database error :", error);
    return res
      .status(500)
      .json({ message: `Database Error: ${error.message}` });
  }
};

exports.createOrder = createOrder;
exports.getAllOrders = getAllOrders;
