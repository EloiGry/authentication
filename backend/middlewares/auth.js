const verifyUser = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({error : "Unauthorized"})
    } else {
        next()
    }
}

module.exports = {
    verifyUser
}