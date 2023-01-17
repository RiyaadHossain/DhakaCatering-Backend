const Item = require("../Models/Item");

// 1. Get Items__________________________
exports.getItems = async (req, res) => {
    try {
        const data = await Item.find()

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

// 2. Get Item__________________________
exports.getItem = async (req, res) => {
    const id = req.params.id

    try {
        const data = await Item.findById(id)

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

// 3. Create Item__________________________
exports.createItem = async (req, res) => {
    try {
        const data = await Item.create(req.body)

        res.status(201).json({
            status: "success",
            messgae: "Item Item created successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Update Item__________________________
exports.updateItem = async (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    const options = { new: true, runValidators: true }

    try {
        const result = await Item.findByIdAndUpdate(id, updatedData, options)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Item couldn't update",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Item data updated successfully!",
            result,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 5. Delete Item__________________________
exports.deleteItem = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Item.findByIdAndDelete(id)

        if (!result) {
            return res.status(400).json({
                status: "fail",
                error: "Item couldn't delete",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Item deleted Successfully",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 6. Bulk Delete Item__________________________
exports.bulkDeleteItem = async (req, res) => {
    const { ids } = req.body

    try {
        const data = await Item.deleteMany({ _id: ids })

        if (!data.deletedCount) { // "deletedCount" & "acknowledged"
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete Items",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "Multiple Item deleted successfully!",
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
