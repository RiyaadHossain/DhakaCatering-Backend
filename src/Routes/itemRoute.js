const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const itemController = require("../Controllers/itemController");
const { authorization } = require('../Middlewares/authorization');

router.route("/")
    .get(itemController.getItems)
    .post(verifyToken, authorization("Super Admin", "Admin"), itemController.createItem)
    .delete(verifyToken, authorization("Super Admin", "Admin"), itemController.bulkDeleteItem)

router.route("/:id")
    .get(itemController.getItem)
    .patch(verifyToken, authorization("Super Admin", "Admin"), itemController.updateItem)
    .delete(verifyToken, authorization("Super Admin", "Admin"), itemController.deleteItem)

module.exports = router