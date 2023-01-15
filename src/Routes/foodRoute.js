const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const foodController = require("../Controllers/foodController");
const { authorization } = require('../Middlewares/authorization');

router.route("/")
    .get(foodController.getFoods)
    .post(verifyToken, authorization("Super Admin", "Admin"), foodController.createFood)
    .delete(verifyToken, authorization("Super Admin", "Admin"), foodController.bulkDeleteFood)

router.route("/:id")
    .get(foodController.getFood)
    .patch(verifyToken, authorization("Super Admin", "Admin"), foodController.updateFood)
    .delete(verifyToken, authorization("Super Admin", "Admin"), foodController.deleteFood)

module.exports = router