import mongoose, { Schema } from "mongoose"
import { generate } from "otp-generator"
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hashPass: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            default: () => generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }),
        },
        name: {
            type: String,
        },
        handle: {
            type: String,
        },
        bio: {
            type: String,
        },
        following: {
            type: Array,
            default: [],
            ref: "User",
        },
        followers: {
            type: Array,
            default: [],
            ref: "User",
        },
        posts: {
            type: Array,
            default: [],
            ref: "Post",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isFilled: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema)

export default User
