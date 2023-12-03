import { addLike, removeLike } from "../controllers/like.js"
import { Router } from "express"
import { verifyToken } from "../controllers/verifyToken.js"

const router = Router()

router.post("/like", verifyToken, addLike)
router.delete("/like", verifyToken, removeLike)
export default router
