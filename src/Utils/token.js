const jwt = require('jsonwebtoken');

exports.generateToken = ({ _id, email, role }) => {
    const payload = { _id, email, role }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token
}