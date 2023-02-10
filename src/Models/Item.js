const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uniquie: [true, "Item title must be unique"],
        required: [true, "Item Name is required"]
    },
    price: {
        type: Number,
        min: [0, "Price can't be negative"],
        required: [true, "Item Price is required"]
    },
    discountedPrice: { type: Number, trim: true },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description is too long"],
        required: [true, "Item Description is required"]
    },
    status: {
        type: String,
        enum: {
            values: ["active", "unavailable"],
            message: "Status can be only active/unavailable"
        },
        default: "active"
    },
    image: {
        title: String,
        url: String
    },
    category: {
        type: String,
        enum: {
            values: ["Breakfast", "Lunch", "Dinner", "All"],
            message: "Only All/Breakfast/Lunch/Dinner value is accpeted"
        },
        required: [true, "Item Category is required"],
    },
    reviews: [{
        userId: ObjectId,
        name: String,
        review: String,
    }],
    viewCount: {
        type: Number,
        default: 0
    },
    sellCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Item = mongoose.model("Item", itemSchema)
module.exports = Item