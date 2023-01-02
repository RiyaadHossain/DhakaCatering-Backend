const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types

const wishListSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: [true, "User id is required"]
    },
    foodId: {
        type: ObjectId,
        required: [true, "User id is required"]
    }
}, { timestamps: true })

const WishList = mongoose.model("WishList", wishListSchema)
module.exports = WishList