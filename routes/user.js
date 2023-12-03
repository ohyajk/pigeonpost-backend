import { Router } from "express"
import { createUser, getUsers, currentUser, verifyOTP, fillData, follow, unfollow } from "../controllers/user.js"
import { verifyToken } from "../controllers/verifyToken.js"

const router = Router()

router.get("/users", verifyToken, getUsers)
router.post("/user", createUser)
router.get("/user/:id", verifyToken, currentUser)
router.post("/verify", verifyToken, verifyOTP)
router.post("/onboard", verifyToken, fillData)
router.post("/follow", verifyToken, follow)
router.post("/unfollow", verifyToken, unfollow)

export default router
