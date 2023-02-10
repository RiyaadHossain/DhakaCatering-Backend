const express = require('express');
const router = express.Router()
const galleryController = require("../Controllers/galleryController");
const { authorization } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.route("/")
    .get(galleryController.getGallery)
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .post(galleryController.createGalleryPicture)
    .delete(galleryController.bulkDeleteGalleryPicture)

router.route("/:id")
    .all(verifyToken, authorization("Super Admin", "Admin", "User"))
    .patch(galleryController.updateGalleryPicture)
    .delete(galleryController.deleteGalleryPicture)

module.exports = router