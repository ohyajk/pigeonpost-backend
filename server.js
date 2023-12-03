import Express, { json } from "express"
import connect from "./db/mongo.js"
import { configDotenv } from "dotenv"
import user from "./routes/user.js"
import login from "./routes/login.js"
import post from "./routes/post.js"
import like from "./routes/like.js"
import comment from "./routes/comment.js"

import cors from "cors"

configDotenv()
connect()
const server = Express()

server.use(json())
server.use(cors())
server.use("/api", user)
server.use("/api/", login)
server.use("/api/", post)
server.use("/api/", like)
server.use("/api/", comment)

server.get("/", (req, res) => {
    res.send("Server is running 😍")
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`🚓 Server running on port ${PORT} 😎`)
})
