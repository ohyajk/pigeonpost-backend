import { Router } from "express"
import { verifyToken } from "../controllers/verifyToken.js"
import { createPost, getAuthorPosts, getAllPosts, deletePost } from "../controllers/post.js"

const router = Router()

router.post("/post", verifyToken, createPost)
router.get("/posts/:author", verifyToken, getAuthorPosts)
router.get("/posts/", verifyToken, getAllPosts)
router.delete("/post/:pid", verifyToken, deletePost)

export default router
