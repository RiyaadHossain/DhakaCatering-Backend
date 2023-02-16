const Order = require("../Models/Order");
const Package = require("../Models/Package");
const User = require("../Models/User");

// 1. Get Orders____________________
exports.getOrders = async (req, res) => {
    const { foodId, userId } = req.query

    let query = {}

    if (foodId) {
        query.foodId = foodId
    }
    if (userId) {
        query.userId = userId
    }

    try {

        const orders = await Order.find(query).populate("userId foodId")
        res.status(200).json({
            status: "success",
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
exports.createOrder = async (req, res) => {
    const userId = req.user._id
    const { foodId, totalPrice, person } = req.body

    try {

        await User.findByIdAndUpdate(userId, { $inc: { totalPurchase: totalPrice, orderCount: 1 } })
        await Package.findByIdAndUpdate(foodId, { $inc: { sellCount: 1 } })

        const order = await Order.create({ userId, foodId, totalPrice, person })
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
