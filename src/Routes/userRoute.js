const express = require('express');
const router = express.Router()
const userController = require("../Controllers/userController");
const { verifyToken } = require('../Middlewares/verifyToken');

router.post("/signup", userController.signUp)
router.post("/signin", userController.signIn)
router.get("/initial", verifyToken, userController.initialSignIn)
router.post("/update-profile", verifyToken, userController.updateProfile)

module.exports = router