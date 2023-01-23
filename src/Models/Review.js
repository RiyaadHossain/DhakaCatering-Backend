const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "You must enter your name"]
    },
    review: {
        type: String,
        trim: true,
        required: [true, "You must enter Review text"]
    },
    userId: {
        type: ObjectId,
        required: [true, "User id is required"]
    },
    foodId: {
        type: ObjectId,
        required: [true, "Food item id is required"]
    },

}, { timestamps: true })

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review