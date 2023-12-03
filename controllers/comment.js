import Post from "../models/post.js"

export const addComment = async (req, res) => {
    try {
        const { id, postId, content } = req.body
        const post = await Post.findById(postId)

        post.comments.push({ id, content })
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
