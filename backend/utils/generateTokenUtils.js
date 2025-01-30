import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const generateToken = (userId) => {
    const payload = { userId }
    const secretKey = process.env.JWT_SECRET

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }) // token is a string that contains header, payload, and signature
    return token
}
export default generateToken