import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// LOGIN

export const login = async (req, res) => {
    const { email, pass } = req.body

    const findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ message: "User does not exist" })
    await bcrypt.compare(pass, findUser.hashPass).then(() => {
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET)
        res.status(200).json({
            token,
            id: findUser._id,
            isVerified: findUser.isVerified,
            isFilled: findUser.isFilled,
        })
    })
}
