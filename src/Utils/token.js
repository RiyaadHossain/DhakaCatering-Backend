const jwt = require('jsonwebtoken');

exports.generateToken = ({ email, role }) => {
    const payload = { email, role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token
}