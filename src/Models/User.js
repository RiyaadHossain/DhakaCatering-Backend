const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email address is required"],
        validate: [validator.isEmail, "Please Provide a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => validator.isStrongPassword(value, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: "Password is not strong enough.",
        }
    },
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [20, "Name is too long"],
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isMobilePhone(value),
            message: "Please provide a valid phone number",
        },
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not accepted for user role"
        },
        default: "user",
    },
    address: {
        type: String,
        trim: true,
        maxLength: [200, "Address is too long"]
    },
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User