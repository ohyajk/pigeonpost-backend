import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const { token } = req.body
    if (!token) {
        return res.status(401).json({
            message: "No token provided",
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token",
                err,
            })
        }
        req.decoded = decoded
        next()
    })
}
