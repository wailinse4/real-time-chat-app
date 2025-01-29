import dotenv from "dotenv"
dotenv.config()

const nodeEnv = process.env.NODE_ENV
const setCookie =  (res, token) => {
    res.cookie("jwt", token, {
        maxAge: 3600000,
        httpOnly: true, 
        secure: nodeEnv !== "development", 
        sameSite: "strict", 
    })
}
export default setCookie