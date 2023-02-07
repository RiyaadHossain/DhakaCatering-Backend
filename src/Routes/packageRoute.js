const express = require('express');
const router = express.Router()
const { verifyToken } = require('../Middlewares/verifyToken');
const packageController = require("../Controllers/packageController");
const { authorization } = require('../Middlewares/authorization');

router.route("/")
    .get(packageController.getPackages)
    .patch(packageController.updateViewSell)
    .post(verifyToken, authorization("Super Admin", "Admin"), packageController.createPackage)
    .delete(verifyToken, authorization("Super Admin", "Admin"), packageController.bulkDeletePackage)

router.route("/:id")
    .get(packageController.getPackage)
    .patch(verifyToken, authorization("Super Admin", "Admin"), packageController.updatePackage)
    .delete(verifyToken, authorization("Super Admin", "Admin"), packageController.deletePackage)

module.exports = router