const Package = require("../Models/Package");
const User = require("../Models/User");

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