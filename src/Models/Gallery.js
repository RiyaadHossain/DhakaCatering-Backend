const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    imgURL: {
        type: String,
        required: [true, "Image URL is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    }
}, { timestamps: true })

const Gallery = mongoose.model("Gallery", gallerySchema)
module.exports = Gallery
