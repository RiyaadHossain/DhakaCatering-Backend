const User = require('../Models/User');
const { generateToken } = require('../Utils/token');
const { authorization } = require('../Middlewares/authorization');
const { sendMail } = require('../Utils/email');
const bcrypt = require('bcrypt');
const moment = require("moment/moment")

// 1. Sign Up________________________________
exports.signUp = async (req, res) => {
    const { email, contactNumber } = req.body
    try {

        const emailExist = await User.findOne({ email })
        const numberExist = await User.findOne({ contactNumber })

        if (emailExist && emailExist.status === 'active') {
            return res.status(400).json({
                status: "fail",
                error: "User Email already exist",
            });
        }

        if (numberExist) {
            return res.status(400).json({
                status: "fail",
                error: "Number already exist",
            });
        }

        const user = await User.create(req.body)
        const conformationToken = user.conformationToken()

        await user.save({ validateBeforeSave: false })

        const URL = req.protocol + '://' + req.get('host') + req.originalUrl;

        const mailInfo = {
            email: user.email,
            subject: "Confirm Your Account",
            html: `<p>Thanks for creating your Account. Please activate your account. <a href="${URL}/confirmation/${conformationToken}">Click Here</a></p>`,
        }

        sendMail(mailInfo)
        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            messgae: "User Sign Up successfully!",
            data: { token, user },
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

        // if (user.status !== 'active') {
        //     return res.status(401).json({
        //         status: "fail",
        //         error: "User account isn't active. Please contact support.",
        //     });
        // }

        const comparePass = password === user.password;
        // const comparePass = user.compareHash(password, user.password)

        if (!comparePass) {
            return res.status(401).json({
                status: "fail",
                error: "User credential is wrong.",
            });
        }

        const token = generateToken(user)

        res.status(200).json({
            status: "success",
            messgae: "User Sign In successfully!",
            data: { token, user },
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 3. Initial LogIn________________________________
exports.initialSignIn = async (req, res) => {
    const { email, role } = req.user

    // User Authorization conformation
    authorization(role)

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                status: "fail",
                error: "User didn't find",
            });
        }

        res.status(200).json({
            status: "success",
            messgae: "User Sign In successfully!",
            data: user
        });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}

// 4. Update Profile________________________________
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

// 5. User Persistency________________________________
exports.userPersistency = async (req, res) => {

    if (req.user.role) {

        try {
            const user = await User.findById(req.user._id)

            res.status(200).json({
                status: "success",
                data: user,
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                error: "Internal Server Error"
            });
        }


    } else {
        res.status(400).json({
            status: "fail",
            error: "Unauthorize User"
        });
    }
}

// 6. Account Confirmation________________________________
exports.confirmAccount = async (req, res) => {
    const confirmationToken = req.params.token

    try {

        const user = await User.findOne({ confirmationToken })

        if (!user) {
            return res.render('Invalid, try againa 😔')
        }

        const expired = moment() > moment(user.confirmationTokenExpires)

        if (expired) {
            return res.render('Expired Token')
        }

        user.status = 'active'
        user.confirmationToken = undefined
        user.confirmationTokenExpires = undefined

        await user.save({ validateBeforeSave: false })

        res.render('index')

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
}