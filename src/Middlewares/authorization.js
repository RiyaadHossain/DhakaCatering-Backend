exports.authorization = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(400).json({
                status: "fail",
                error: "Authorization failed",
            });
        }
        next()
    }
}