const moment = require("moment/moment");
const Gallery = require("../Models/Gallery");

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

// 3. Create Gallery Picture____________________
exports.createGalleryPicture = async (req, res) => {
    let data = req.body
    data = { ...data, date: moment(data.date).format("DD MMM YYYY") }

    try {
        const gallery = await Gallery.create(data)
        res.status(200).json({
            status: "success",
            gallery,
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Update Gallery Picture____________________
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

// 5. Delete Gallery Picture____________________
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

// 5. Bulk Delete Gallery Picture____________________
exports.bulkDeleteGalleryPicture = async (req, res) => {
    const { ids } = req.body

    try {

        await Gallery.deleteMany(ids)
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
