const express = require('express');
const router = express.Router()
const orderRequestController = require("../Controllers/orderRequestController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/")
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .get(orderRequestController.getOrderRequests)
    .post(orderRequestController.createOrderRequest)

router.route("/:id")
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .get(orderRequestController.getOrderRequest)
    .patch(orderRequestController.updateOrderRequest)

module.exports = router