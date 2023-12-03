import { Router } from "express"
import { verifyToken } from "../controllers/verifyToken.js"
import { addComment } from "../controllers/comment.js"

const router = Router()

router.post("/comment", verifyToken, addComment)
export default router
