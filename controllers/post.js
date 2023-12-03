import Post from "../models/post.js"
import User from "../models/user.js"

// Create Post
export const createPost = (req, res) => {
    const { content, owner } = req.body

    const post = new Post({
        owner,
        content,
    })
    post.save()
        .then((data) => {
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

// Get posts of Author

export const getAuthorPosts = (req, res) => {
    const { author } = req.params

    Post.find({ owner: author })
        .sort({ createdAt: -1 })
        .populate([
            {
                path: "likes",
                select: "_id name handle",
            },
            {
                path: "owner",
                select: "_id name handle",
            },
            {
                path: "comments.id",
                select: "_id name handle",
            },
        ])
        .then((data) => {
            res.status(200).json({
                data,
            })
        })
        .catch((error) => {
            res.status(500).json({
                error,
            })
        })
}

// Get all posts

export const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1 //
    const pageSize = parseInt(req.query.pageSize) || 5
    const userId = req.query.userId
    User.findById(userId).then(async (user) => {
        if (!user) {
            throw new Error("User not found")
        }

        const followingUsers = user.following
        const totalItems = await Post.countDocuments({ owner: { $in: followingUsers } })
        const totalPages = Math.ceil(totalItems / pageSize)

        return Post.find({ owner: { $in: followingUsers } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate([
                {
                    path: "likes",
                    select: "_id name handle",
                },
                {
                    path: "owner",
                    select: "_id name handle",
                },
                {
                    path: "comments.id",
                    select: "_id name handle",
                },
            ])
            .then((data) => {
                res.status(200).json({
                    data,
                    currentPage: page,
                    totalPages,
                    totalItems,
                })
            })
            .catch((error) => {
                res.status(500).json({
                    error,
                })
            })
    })
}

export const deletePost = (req, res) => {
    const { pid } = req.params

    Post.findByIdAndDelete(pid).then(() => {
        res.status(200).json({
            message: "Post deleted successfully",
        })
    })
}
