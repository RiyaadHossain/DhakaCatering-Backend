const Order = require("../Models/Order");
const Package = require("../Models/Package");
const OrderRequest = require("../Models/OrderRequest");
const { sendMail } = require("../Utils/email");
const User = require("../Models/User");

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

// 2. Get Order Request____________________
exports.getOrderRequest = async (req, res) => {
    const { id } = req.params

    try {

        const orderRequest = await OrderRequest.findById(id).populate("allItems.id createdBy.id")
        res.status(200).json({
            status: "success",
            orderRequest,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Create Order Request____________________
exports.createOrderRequest = async (req, res) => {
    let orderRequestData = req.body
    orderRequestData = { ...orderRequestData, createdBy: { role: req.user.role, id: req.user._id }, status: 'Pending' }

    try {

        const orderRequest = await OrderRequest.create(orderRequestData)
        const mailInfo = {
            email: "riyadhossain017037@gmail.com",
            subject: "New Order Request",
            html: `<p>A new user has sent an order request. Please check on Admin Dashboard. <a href="${URL}/confirmation/${conformationToken}">Click Here</a></p>`,
        }

        sendMail(mailInfo)

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

// 4. Update Order Request____________________
exports.updateOrderRequest = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    const options = { new: true, runValidators: true }

    try {

        const orderRequestData = await OrderRequest.findById(id)
        const user = await User.findById(orderRequestData.createdBy.id)
        const orderRequest = await OrderRequest.findByIdAndUpdate(id, { status }, options)
        const { name, allItems, totalPrice, createdBy } = orderRequestData

        if (status === 'Approved') {
            const url = "https://cutt.ly/S9ZxBFI"
            const description = "This is a custom Package designed by a Regular customer"
            const packageData = { name, allItems, price: totalPrice, description, category: "Silver", image: { title: "", url }, viewCount: 1, sellCount: 1 }
            const package = await Package.create(packageData)
            await Order.create({ userId: createdBy.id, foodId: package._id })

            const mailInfo = {
                email: user.email,
                subject: "Your Order Request is approved",
                html: `<p>Your order request has been approved. Please contact with this number to Confirm your order. </br> GP: 01703790978 </p>`,
            }

            sendMail(mailInfo)
        }

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
