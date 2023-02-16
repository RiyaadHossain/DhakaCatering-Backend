const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require("moment/moment");
const { CLIENT_RENEG_LIMIT } = require("tls");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "Email address is required"],
        validate: [validator.isEmail, "Please Provide a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (value) {
                return this.password === value
            },
            message: "Password didn't match"
        }
    },
    fullName: {
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
            values: ["User", "Admin", "Super Admin"],
            message: "{VALUE} is not accepted for user role"
        },
        default: "User",
    },
    address: {
        type: String,
        trim: true,
        maxLength: [200, "Address is too long"]
    },
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"],
        default: 'https://rb.gy/m6wmnj'
    },
    occupation: {
        type: String,
        default: 'Customer'
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
    star: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        trim: true
    },
    totalPurchase: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number, default: 0
    },
    orderCount: {
        type: Number,
        default: 0
    },
    confirmationToken: String,
    confirmationTokenExpires: Date
}, { timestamps: true })

// // Hash Password______________
// userSchema.pre('save', function (next) {
//     const hashedPass = bcrypt.hashSync(this.password, 10)
//     this.password = hashedPass
//     this.confirmPassword = undefined
//     next()
// })

// // Compare hash Password_____________
// userSchema.methods.compareHash = (pass, hashedPass) => {
//     const isValidPass = bcrypt.compareSync(pass, hashedPass)
//     return isValidPass
// }

// Generate Conrirmation Token_____________
userSchema.methods.conformationToken = function () {
    const token = crypto.randomBytes(32).toString('hex')
    this.confirmationToken = token

    const expireDate = moment().add(1, 'day')
    this.confirmationTokenExpires = expireDate
    return token
}

const User = mongoose.model("User", userSchema)
module.exports = User


/* bcrypt.compare(pass, hashedPass, function (err, isValidPass) {
        if (err) callback(err)
        else callback(null, isValidPass)
    }) */