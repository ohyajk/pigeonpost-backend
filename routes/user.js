import { Router } from "express"
import { createUser, getUsers, currentUser, verifyOTP, fillData } from "../controllers/user.js"
import { verifyToken } from "../controllers/verifyToken.js"

const router = Router()

router.get("/users", verifyToken, getUsers)
router.post("/user", createUser)
router.get("/user", verifyToken, currentUser)
router.post("/verify", verifyToken, verifyOTP)
router.post("/onboard", verifyToken, fillData)
export default router
