import dotenv from "dotenv"
dotenv.config()

const nodeEnv = process.env.NODE_ENV
const setCookie =  (res, token) => {
    res.cookie("jwt", token, { // The cookie is named "jwt" and it will store the jwt token
        maxAge: 3600000,
        httpOnly: true, 
        secure: nodeEnv !== "development", 
        sameSite: "strict", 
    })
}
export default setCookie