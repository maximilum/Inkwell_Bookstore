const express = require("express");
const {
  createOrder,
  getAllOrders,
} = require("../controllers/orders.controllers");

const Router = express.Router();

Router.post("/", createOrder);
Router.get("/:id", getAllOrders);

module.exports = Router;
