const express = require('express');
const router = express.Router()
const orderController = require("../Controllers/orderController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/")
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .get(orderController.getOrders)
    .post(orderController.createOrder)

module.exports = router