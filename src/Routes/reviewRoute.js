const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const { authorization } = require('../Middlewares/authorization');
const reviewController = require("../Controllers/reviewController");

router.route("/")
    .get(reviewController.getReviews)
    .post(verifyToken, authorization("User"), reviewController.postReview)
    .delete(verifyToken, authorization("Super Admin", "Admin"), reviewController.deleteReviews)

router.route("/:id")
    .get(reviewController.getReview)
    .patch(verifyToken, authorization("Super Admin", "User", "Admin"), reviewController.updateReview)

module.exports = router