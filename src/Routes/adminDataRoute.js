const express = require('express');
const router = express.Router()
const adminDataController = require("../Controllers/adminDataController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/users")
    .all(verifyToken, authorization("Super Admin", "Admin",))
    .get(adminDataController.getUsers)

    router.get("/stat-data", verifyToken, authorization("Super Admin", "Admin"), adminDataController.statData)
    router.get("/sidebar-data", verifyToken, authorization("Super Admin", "Admin"), adminDataController.sidebarData)
    router.get("/leaderboard", verifyToken, authorization("Super Admin", "Admin"), adminDataController.leaderboardData)

router.route("/user/:id")
    .all(verifyToken, authorization("Super Admin", "Admin",))
    .get(adminDataController.getUser)
    .patch(adminDataController.updateUser)

module.exports = router