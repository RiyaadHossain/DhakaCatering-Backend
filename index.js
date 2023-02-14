const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000
dotenv.config()

// DB Connection
require("./src/Config/DBConnect")

// EJS Engine
app.set("view engine", "ejs")

// Middlewares
app.use(express.json())
app.use(cors())

const userRoute = require("./src/Routes/userRoute")
const itemRoute = require("./src/Routes/itemRoute")
const orderRoute = require("./src/Routes/orderRoute")
const reviewRoute = require("./src/Routes/reviewRoute")
const galleryRoute = require("./src/Routes/galleryRoute")
const packageRoute = require("./src/Routes/packageRoute")
const wishListRoute = require("./src/Routes/wishListRoute")
const orderRequestRoute = require("./src/Routes/orderRequestRoute")
const adminDataRoute = require("./src/Routes/adminDataRoute")

// Routes
app.use("/api/auth", userRoute)
app.use("/api/item", itemRoute)
app.use("/api/order", orderRoute)
app.use("/api/review", reviewRoute)
app.use("/api/package", packageRoute)
app.use("/api/gallery", galleryRoute)
app.use("/api/wishlist", wishListRoute)
app.use("/api/admin-data", adminDataRoute)
app.use("/api/order-request", orderRequestRoute)

// Health Check
app.get('/', (req, res) => {
    res.send("Welcome to Dhaka Catering Server")
});

// Listen to Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.blue.bold);
});