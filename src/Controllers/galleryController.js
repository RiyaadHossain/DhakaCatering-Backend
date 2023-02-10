const Gallery = require("../Models/Gallery");
const Order = require("../Models/Order");
const Package = require("../Models/Package");
const User = require("../Models/User");

// 1. Get Gallery____________________
exports.getGallery = async (req, res) => {

    try {

        const gallery = await Gallery.find()
        res.status(200).json({
            status: "success",
            gallery,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Get Gallery Picture____________________
exports.getGalleryPicture = async (req, res) => {
    const { id } = req.params

    try {

        const gallery = await Gallery.findById(id)
        res.status(200).json({
            status: "success",
            gallery,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Update Gallery Picture____________________
exports.updateGalleryPicture = async (req, res) => {
    const { id } = req.params
    const { data } = req.body
    const options = { new: true, runValidators: true }

    try {

        const gallery = await Gallery.findByIdAndUpdate(id, data, options)
        res.status(200).json({
            status: "success",
            gallery,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Delete Gallery Picture____________________
exports.deleteGalleryPicture = async (req, res) => {
    const { id } = req.params

    try {

        await Gallery.findByIdAndDelete(id)
        res.status(200).json({
            status: "success",
            message: "Gallery Deleted Successfully"
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
