const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const foodController = require("../Controllers/foodController");
const { authorization } = require('../Middlewares/authorization');

router.route("/")
    .get(foodController.getFoods)
    .post(verifyToken, authorization("admin"), foodController.createFood)
    .delete(verifyToken, authorization("admin"), foodController.bulkDeleteFood)

router.route("/:id")
    .get(foodController.getFood)
    .patch(verifyToken, authorization("admin"), foodController.updateFood)
    .delete(verifyToken, authorization("admin"), foodController.deleteFood)

module.exports = router