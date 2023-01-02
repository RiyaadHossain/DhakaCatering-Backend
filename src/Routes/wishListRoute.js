const express = require('express');
const router = express.Router()
const wishListController = require("../Controllers/wishListController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/:foodId")
    .all(verifyToken, authorization('user'))
    .get(wishListController.getWishList)
    .post(wishListController.addToWishList)
    .delete(wishListController.removeFromWishList)

module.exports = router