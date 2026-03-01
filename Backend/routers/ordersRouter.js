const express = require("express");
const {
  createOrder,
  getAllOrders,
} = require("../controllers/orders.controllers");

const Router = express.Router();

Router.post("/", createOrder);
Router.get("/:email", getAllOrders);

module.exports = Router;
