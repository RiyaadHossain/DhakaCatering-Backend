const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types

const orderSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: [true, "User id is required"]
    },
    foodId: {
        type: ObjectId,
        ref: "Package",
        required: [true, "Food id is required"]
    },
    person: Number,
    totalPrice: Number
}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)
module.exports = Order