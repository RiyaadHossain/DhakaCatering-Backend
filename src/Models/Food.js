const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        uniquie: [true, "Food title must be unique"],
        required: [true, "Food Name is required"]
    },
    price: {
        type: Number,
        min: [0, "Price can't be negative"],
        required: [true, "Food Price is required"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description is too long"],
        required: [true, "Food Description is required"]
    },
    status: {
        type: String,
        enum: {
            values: ["active", "inactive"],
            message: "Status can be only active/inactive"
        },
        default: "active"
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
    }],
    category: {
        type: String,
        enum: {
            values: ["Breakfast", "Lunch", "Dinner"],
            message: "Only Breakfast/Lunch/Dinner value is accpeted"
        },
        required: [true, "Food Category is required"],
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

const Food = mongoose.model("Food", foodSchema)
module.exports = Food