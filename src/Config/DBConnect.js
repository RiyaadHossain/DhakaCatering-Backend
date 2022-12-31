const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("Database Connected Successfully".yellow.bold))
    .catch(err => console.log(err))