const Food = require("../Models/Food");

// 1. Get Foods__________________________
exports.getFoods = async (req, res) => {
    try {
        const data = await Food.find()

        res.status(200).json({
            status: "success",
            messgae: "User Sign Up successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Get Food__________________________
exports.getFood = async (req, res) => {
    const id = req.params.id

    try {
        const data = await Food.findById(id)

        res.status(200).json({
            status: "success",
            messgae: "Specific Food Item Data",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Create Food__________________________
exports.createFood = async (req, res) => {
    try {
        const data = await Food.create(req.body)

        res.status(201).json({
            status: "success",
            messgae: "Food Item created successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Update Food__________________________
exports.updateFood = async (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true, runValidators: true }

    try {
        const result = await Food.findByIdAndUpdate(id, updatedData, options)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Food couldn't update",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Food item data updated successfully!",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 5. Delete Food__________________________
exports.deleteFood = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Food.findByIdAndDelete(id)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Food couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Food deleted Successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 6. Bulk Delete Food__________________________
exports.bulkDeleteFood = async (req, res) => {
    const { ids } = req.body

    try {
        const data = await Food.deleteMany({ _id: ids })
        console.log(data) // "deletedCount" & "acknowledged"

        if (!data.deletedCount) {
            res.status(400).json({
                status: "fail",
                error: "Couldn't delete Food Items",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Multiple food item deleted successfully!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
