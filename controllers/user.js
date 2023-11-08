import sender from "../mailer/sender.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"

// CREATE USER
export const createUser = (req, res) => {
    const { email, pass } = req.body
    const hashPass = bcrypt.hashSync(pass, 10)
    const user = new User({
        email,
        hashPass,
    })
    user.save()
        .then((data) => {
            sender(data.email, data.otp)
            res.status(201).json({
                data,
            })
        })
        .catch((error) => {
            res.status(500).json({
                error,
            })
        })
}

// GET ALL USERS

export const getUsers = (req, res) => {
    User.find()
        .select({ otp: 0, hashPass: 0, isVerified: 0, isFilled: 0 })
        .then((data) => {
            res.status(200).json({
                data,
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
}

// GET CURRENT USER

export const currentUser = (req, res) => {
    const { email } = req.body
    User.findOne({ email })
        .select({ otp: 0, hashPass: 0 })
        .then((data) => {
            res.status(200).json({
                data,
            })
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
}

// VERIFY OTP

export const verifyOTP = (req, res) => {
    const { id, otp } = req.body
    User.findById(id)
        .then((data) => {
            if (data.otp === otp) {
                data.isVerified = true
                data.save()
                    .then(() => {
                        res.status(200).json({
                            message: "Success",
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            err,
                        })
                    })
            } else {
                res.status(400).json({
                    message: "OTP is not correct",
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
}

// FILL USER DATA

export const fillData = (req, res) => {
    const { id, name, handle, bio } = req.body
    User.findById(id)
        .then((data) => {
            console.log(data, name, handle, bio)
            data.name = name
            data.handle = handle
            data.bio = bio
            data.isFilled = true
            data.save()
                .then(() => {
                    res.status(200).json({
                        message: "Success",
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        err,
                    })
                })
        })
        .catch((err) => {
            res.status(500).json({
                err,
            })
        })
}
