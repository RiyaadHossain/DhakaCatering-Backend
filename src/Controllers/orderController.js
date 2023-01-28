const Order = require("../Models/Order");

// 1. Get Orders____________________
exports.getOrders = async (req, res) => {
    const { foodId } = req.body
    const userId = req.user._id

    try {

        const orders = await Order.find({ userId, foodId })
        res.status(200).json({
            status: "success",
            messgae: "Orders fetched successfully!",
            orders,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Create Order____________________
exports.addToOrder = async (req, res) => {
    const userId = req.user._id
    const foodId = req.body.foodId

    try {

        const order = await Order.create({ userId, foodId })
        res.status(200).json({
            status: "success",
            messgae: "Order created successfully!",
            order,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
