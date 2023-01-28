const OrderRequest = require("../Models/OrderRequest");

// 1. Get Order Requests____________________
exports.getOrderRequests = async (req, res) => {
    const { userId } = req.query

    try {

        const orderRequests = await OrderRequest.find({ userId })
        res.status(200).json({
            status: "success",
            orderRequests,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Create Order Request____________________
exports.createOrderRequest = async (req, res) => {
    let orderRequestData  = req.body
    orderRequestData = { ...orderRequestData, createdBy: { role: req.user.role, id: req.user._id }, status: 'Pending' }

    try {

        const orderRequest = await OrderRequest.create(orderRequestData)
        res.status(200).json({
            status: "success",
            messgae: "Order Request created successfully!",
            orderRequest,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Update Order Request____________________
exports.updateOrderRequest = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const options = { new: true, runValidators: true }

    try {

        const orderRequest = await OrderRequest.findByIdAndUpdate(id, status, options)
        res.status(200).json({
            status: "success",
            messgae: "Order Request Updated successfully!",
            orderRequest,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}
