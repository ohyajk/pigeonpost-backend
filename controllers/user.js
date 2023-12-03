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
    const userQuery = req.query.userQuery
    const regex = new RegExp(userQuery, "i")
    User.find({ name: { $regex: regex } })
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
    const { id } = req.params
    User.findOne({ _id: id })
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

// Follow

export const follow = (req, res) => {
    const { myId, userId } = req.body
    User.findById(userId).then((data) => {
        data.followers.push(myId)
        data.save()
    })
    User.findById(myId)
        .then((data) => {
            data.following.push(userId)
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

// Unfollow

export const unfollow = (req, res) => {
    const { myId, userId } = req.body

    // Update the user being unfollowed
    const unfollowedUserPromise = User.findByIdAndUpdate(userId, { $pull: { followers: myId } }, { new: true })

    // Update the current user (myId) to remove the followed user
    const currentUserPromise = User.findByIdAndUpdate(myId, { $pull: { following: userId } }, { new: true })

    Promise.all([unfollowedUserPromise, currentUserPromise])
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
}
