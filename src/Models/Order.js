const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types

const orderSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: [true, "User id is required"]
    },
    foodId: {
        type: ObjectId,
        required: [true, "User id is required"]
    }
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)
module.exports = Order