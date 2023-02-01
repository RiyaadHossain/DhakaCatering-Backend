const Item = require("../Models/Item");
const Order = require("../Models/Order");
const Package = require("../Models/Package");
const User = require("../Models/User");
const OrderRequest = require("../Models/OrderRequest");

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

// 2. Leaderboard Data____________________
exports.leaderboardData = async (req, res) => {


    try {

        const users = await User.find().sort("-totalPurchase").limit(5)
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

// 2. Stat Data____________________
exports.statData = async (req, res) => {


    try {

        const userStat = await User.find().countDocuments()
        const packageStat = await Package.find().countDocuments()
        const itemStat = await Item.find().countDocuments()
        let saleStat = await Order.aggregate([
            {
                $lookup: {
                    from: "packages",
                    localField: "foodId",
                    foreignField: "_id",
                    as: "food"
                }
            },
            {
                $addFields: {
                    packageItem: {
                        $arrayElemAt: ['$food', 0],
                    }
                }
            },
            {
                $unset: ["_id", "foodId", "userId", "createdAt", "updatedAt", "__v", "food"]
            },
            {
                $project: {
                    _id: "$packageItem._id",
                    totalAmount: {
                        $multiply: ["$packageItem.price", "$packageItem.sellCount"]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalAmount" }
                }
            }
        ])

        saleStat = saleStat[0].totalSales

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

// 3. Sidebar Data____________________
exports.sidebarData = async (req, res) => {


    try {

        const users = await User.find().countDocuments()
        const packages = await Package.find().countDocuments()
        const items = await Item.find().countDocuments()
        const OrderRequest = await OrderRequest.find().countDocuments()
        const packages = await Package.find().countDocuments()
        const packages = await Package.find().countDocuments()
        const packages = await Package.find().countDocuments()

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