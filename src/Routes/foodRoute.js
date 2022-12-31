const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const foodController = require("../Controllers/foodController");
const { authorization } = require('../Middlewares/authorization');

router.route("/foods")
    .get(foodController.getFoods)
    .delete(verifyToken, authorization("admin"), foodController.bulkDeleteFood)

router.post("/food", verifyToken, authorization("admin"), foodController.createFood)

router.route("/food/:id")
    .get(foodController.getFood)
    .patch(verifyToken, authorization("admin"), foodController.updateFood)
    .delete(verifyToken, authorization("admin"), foodController.deleteFood)

module.exports = router