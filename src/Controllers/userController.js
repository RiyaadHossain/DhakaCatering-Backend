const User = require('../Models/User');
const { generateToken } = require('../Utils/token');

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

// 2. Sign In________________________________
exports.signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({
            status: "fail",
            error: "Please provide email and password",
        });
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "User didn't find",
            });
        }

        if (user.status !== 'active') {
            console.log(user.status);
            return res.status(401).json({
                status: "fail",
                error: "User account isn't active. Please contact support.",
            });
        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            messgae: "User Sign In successfully!",
            data: { token, user },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Update Profile________________________________
exports.updateProfile = async (req, res) => {
    const id = req.user._id
    const updatedData = req.body
    const options = { new: true, runValidators: true }

    try {
        const data = await User.findByIdAndUpdate(id, updatedData, options)

        res.status(200).json({
            status: "success",
            messgae: "User Updated successfully!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}