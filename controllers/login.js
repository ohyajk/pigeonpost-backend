import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
    const { email, pass } = req.body

    const findUser = await User.findOne({ email })
    if (!findUser) return res.status(401).json({ message: "Invalid Credentials" })

    const isPasswordMatch = await bcrypt.compare(pass, findUser.hashPass)

    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid Credentials" })
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET)
    res.status(200).json({
        token,
        isVerified: findUser.isVerified,
        isFilled: findUser.isFilled,
        id: findUser._id,
        name: findUser.name,
        handle: findUser.handle,
    })
}
