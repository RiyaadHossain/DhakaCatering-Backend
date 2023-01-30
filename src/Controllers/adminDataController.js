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
