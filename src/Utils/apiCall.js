const axios = require('axios').default;

// To keep active the database-
setInterval(async (req, res) => {
    await axios.get('https://dhaka-catering-backend.vercel.app/')
}, 600000)