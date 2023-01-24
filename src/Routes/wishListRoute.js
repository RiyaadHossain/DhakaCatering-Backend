const express = require('express');
const router = express.Router()
const wishListController = require("../Controllers/wishListController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.get("/", verifyToken, authorization('User'), wishListController.getWishList)

router.route("/:foodId")
    .all(verifyToken, authorization('User'))
    .post(wishListController.addToWishList)
    .delete(wishListController.removeFromWishList)

module.exports = router