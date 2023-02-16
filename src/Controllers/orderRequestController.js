const Order = require("../Models/Order");
const Package = require("../Models/Package");
const OrderRequest = require("../Models/OrderRequest");
const { sendMail } = require("../Utils/email");
const User = require("../Models/User");
const { orderReqContent, orderReqUpdateContent } = require("../Utils/html");
const moment = require("moment/moment");

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
    const userId = req.user._id
    let orderRequestData = req.body
    orderRequestData = { ...orderRequestData, createdBy: { role: req.user.role, id: userId }, status: 'Pending' }

    try {

        const user = await User.findById(userId)
        const orderRequest = await OrderRequest.create(orderRequestData)

        const date = moment(orderRequest.date).format("DD MMM YYYY")

        const html = orderReqContent({ user, orderRequest, date })

        const mailInfo = {
            email: "riyadhossain017037@gmail.com",
            subject: "New Order Request",
            html,
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

        let html
        const orderRequestData = await OrderRequest.findById(id)
        const user = await User.findById(orderRequestData.createdBy.id)
        const orderRequest = await OrderRequest.findByIdAndUpdate(id, { status }, options)
        const { name, allItems, totalPrice, createdBy, person } = orderRequestData

        if (status === 'Approved') {
            const url = "https://cutt.ly/S9ZxBFI"
            const description = "This is a custom Package designed by a Regular customer"
            const packageData = { name, allItems, price: totalPrice, description, category: "Silver", image: { title: "", url }, viewCount: 1, sellCount: 1, createdBy: 'User' }
            const package = await Package.create(packageData)
            await Order.create({ userId: createdBy.id, foodId: package._id, person, totalPrice })
        }
        
        html = orderReqUpdateContent({ status, orderRequestData })
        
        const mailInfo = {
            email: user.email,
            subject: `Your Order Request is ${status}`,
            html,
        }

        sendMail(mailInfo)

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
