const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000
dotenv.config()

// DB Connection
require("./src/Config/DBConnect")

// Middlewares
app.use(express.json())
app.use(cors())

const userRoute = require("./src/Routes/userRoute")
const foodRoute = require("./src/Routes/foodRoute")
const reviewRoute = require("./src/Routes/reviewRoute")
const wishListRoute = require("./src/Routes/wishListRoute")
const orderRoute = require("./src/Routes/orderRoute")

// Routes
app.use("/api/auth", userRoute)
app.use("/api/food", foodRoute)
app.use("/api/review", reviewRoute)
app.use("/api/wishList", wishListRoute)
app.use("/api/order", orderRoute)

// Health Check
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listen to Server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.blue.bold);
});