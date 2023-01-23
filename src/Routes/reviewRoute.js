const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const { authorization } = require('../Middlewares/authorization');
const reviewController = require("../Controllers/reviewController");

router.route("/")
    .get(reviewController.getReviews)
    .post(verifyToken, authorization("User"), reviewController.postReview)

router.route("/:id")
    .get(reviewController.getReview)
    .patch(verifyToken, authorization("Super Admin", "User", "Admin"), reviewController.updateReview)
    .delete(verifyToken, authorization("Super Admin", "Admin", "User"), reviewController.deleteReviews)

module.exports = router