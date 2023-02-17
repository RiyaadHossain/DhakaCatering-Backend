const Item = require("../Models/Item");
const Order = require("../Models/Order");
const Package = require("../Models/Package");
const User = require("../Models/User");
const OrderRequest = require("../Models/OrderRequest");
const Gallery = require("../Models/Gallery");

// 1. Get Users____________________
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find()
        res.status(200).json({
            status: "success",
            users,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 2. Get User Details____________________
exports.getUser = async (req, res) => {
    const { id } = req.params

    try {

        const user = await User.findById(id)
        res.status(200).json({
            status: "success",
            user,
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Update User____________________
exports.updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    console.log(data)
    try {

        const user = await User.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({
            status: "success",
            message: "User data updated successfully"
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Leaderboard Data____________________
exports.leaderboardData = async (req, res) => {


    try {
        const users = await User.find({ role: "User" }).sort("-totalPurchase").limit(5)
        const packages = await Package.find().sort("-sellCount").limit(5)

        res.status(200).json({
            status: "success",
            data: { users, packages },
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 5. Stat Data____________________
exports.statData = async (req, res) => {


    try {

        const userStat = await User.find().countDocuments()
        const packageStat = await Package.find().countDocuments()
        const itemStat = await Item.find().countDocuments()
        let saleStat = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: "$totalPrice" } } }])

        saleStat = saleStat[0]?.totalSales ? saleStat[0]?.totalSales : 0

        res.status(200).json({
            status: "success",
            data: { userStat, packageStat, itemStat, saleStat },
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 6. Sidebar Data____________________
exports.sidebarData = async (req, res) => {

    try {
        const users = await User.find({ role: "User" }).countDocuments()
        const items = await Item.find().countDocuments()
        let orders = await Order.find()
        const packages = await Package.find().countDocuments()
        const gallery = await Gallery.find().countDocuments()
        const orderRequests = await OrderRequest.find().countDocuments()
        const admins = await User.find({ role: ["Admin", "Super Admin"] }).countDocuments()
        orders = orders.filter(order => order.foodId && order.userId)
        orders = orders.length
        // const offers = await Offers.find().countDocuments()

        res.status(200).json({
            status: "success",
            data: { users, admins, packages, gallery, items, orders, orderRequests },
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}