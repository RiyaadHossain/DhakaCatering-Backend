const Review = require("../Models/Review");

// 1. Get Reviews__________________________
exports.getReviews = async (req, res) => {
    const { foodId } = req.query

    try {
        const reviews = await Review.find({ foodId })

        res.status(200).json({
            status: "success",
            reviews,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Get Review__________________________
exports.getReview = async (req, res) => {
    const { id } = req.params

    try {
        const review = await Review.findById(id)
        res.status(200).json({
            status: "success",
            review,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Post Review__________________________
exports.postReview = async (req, res) => {
    const reviewData = req.body
    const { id } = req.user

    try {
        const existReview = await Review.findOne({ userId: id, foodId: reviewData.foodId })
        if (existReview) {
            return res.status(400).json({
                status: "fail",
                error: "You can't review for the same item twice",
            });
        }

        const data = await Review.create(reviewData)
        res.status(200).json({
            status: "success",
            messgae: "Review data post successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Update Review__________________________
exports.updateReview = async (req, res) => {
    const { id } = req.params
    const updatedData = req.body
    const options = { new: true, runValidators: true }

    try {
        const data = await Review.findByIdAndUpdate(id, updatedData, options)
        res.status(200).json({
            status: "success",
            messgae: "Review updated successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Delete Review__________________________
exports.deleteReview = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Review.findByIdAndDelete(id)

        if (data.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Review Couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Review deleted successfully!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 5. Bulk Delete Reviews__________________________
exports.deleteReviews = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Review.findByIdAndDelete(id)

        if (data.deletedCount) {
            return res.status(400).json({
                status: "fail",
                error: "Review Couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Review deleted successfully!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}