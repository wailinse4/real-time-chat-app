import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoute.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth", authRoutes)

connectDB()
app.listen(port, () => console.log(`The server is listening on port ${port}`))