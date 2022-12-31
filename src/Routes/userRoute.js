const express = require('express');
const router = express.Router()
const userController = require("../Controllers/userController");
const { verifyToken } = require('../Middlewares/verifyToken');

router.get("/signup", userController.signUp)
router.get("/signin", userController.signIn)
router.get("/update-profile", verifyToken, userController.updateProfile)

module.exports = router