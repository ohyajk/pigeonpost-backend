import Post from "../models/post.js"

export const addLike = async (req, res) => {
    try {
        const { id, postId } = req.body
        const post = await Post.findById(postId)

        if (post.likes.includes(id)) {
            return res.status(200).json({
                message: "Already liked",
            })
        }

        post.likes.push(id)
        await post.save()

        res.status(200).json({
            message: "Success",
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal Server Error",
        })
    }
}

export const removeLike = async (req, res) => {
    try {
        const { id, postId } = req.body
        const post = await Post.findById(postId)

        if (post.likes.some((like) => like._id == id)) {
            post.likes = post.likes.filter((like) => like._id != id)
            await post.save()

            res.status(200).json({
                message: "Success",
            })
        } else {
            res.status(400).json({
                error: "User has not liked the post",
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal Server Error",
        })
    }
}
