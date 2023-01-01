const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const { authorization } = require('../Middlewares/authorization');
const reviewController = require("../Controllers/reviewController");

router.route("/")
    .get(reviewController.getReviews)
    .post(verifyToken, authorization("user"), reviewController.postReview)
    .delete(verifyToken, authorization("admin"), reviewController.deleteReviews)

router.route("/:id")
    .get(reviewController.getReview)
    .patch(verifyToken, authorization("user admin"), reviewController.updateReview)

module.exports = router