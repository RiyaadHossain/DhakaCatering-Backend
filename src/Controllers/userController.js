const User = require('../Models/User');

// 1. Sign Up________________________________
exports.signUp = async (req, res) => {
    try {

        const user = await User.create(req.body)

        res.status(200).json({
            status: "success",
            messgae: "User Sign Up successfully!",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 1. Sign In________________________________
exports.signIn = async (req, res) => {
    try {

        res.status(200).json({
            status: "success",
            messgae: "User Sign In successfully!",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}