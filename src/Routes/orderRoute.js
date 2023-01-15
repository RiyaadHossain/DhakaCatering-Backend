const express = require('express');
const router = express.Router()
const orderController = require("../Controllers/orderController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/:foodId")
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .get(orderController.getOrders)
    .post(orderController.addToOrder)

module.exports = router