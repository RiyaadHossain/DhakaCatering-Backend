const Package = require("../Models/Package");

// 1. Get Packages__________________________
exports.getPackages = async (req, res) => {
    try {
        const data = await Package.find()

        res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Get Package__________________________
exports.getPackage = async (req, res) => {
    const id = req.params.id

    try {
        const data = await Package.findById(id)

        res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Create Package__________________________
exports.createPackage = async (req, res) => {
    try {
        const data = await Package.create(req.body)

        res.status(201).json({
            status: "success",
            messgae: "Package Item created successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Update Package__________________________
exports.updatePackage = async (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true, runValidators: true }

    try {
        const result = await Package.findByIdAndUpdate(id, updatedData, options)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Package couldn't update",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Package item data updated successfully!",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 5. Delete Package__________________________
exports.deletePackage = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Package.findByIdAndDelete(id)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Package couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Package deleted Successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 6. Bulk Delete Package__________________________
exports.bulkDeletePackage = async (req, res) => {
    const { ids } = req.body

    try {
        const data = await Package.deleteMany({ _id: ids })

        if (!data.deletedCount) { // "deletedCount" & "acknowledged"
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete Package Items",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Multiple Package item deleted successfully!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
