const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types

const packageSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uniquie: [true, "Package title must be unique"],
        required: [true, "Package Name is required"]
    },
    allItems: {
        items: [{
            type: ObjectId,
            ref: 'Item'
        }],
        totalPrice: Number
    },
    price: {
        type: Number,
        min: [0, "Price can't be negative"],
        required: [true, "Package Price is required"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [650, "Description is too long"],
        required: [true, "Package Description is required"]
    },
    category: {
        type: String,
        enum: {
            values: ["Bronze", "Silver", "Golden", "Dimond"],
            message: "Only Bronze/Silver/Golden/Dimond value is accpeted"
        },
        required: [true, "Item Category is required"],
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
    reviews: [{
        userId: {
            type: ObjectId,
            ref: 'User'
        },
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

const Package = mongoose.model("Package", packageSchema)
module.exports = Package