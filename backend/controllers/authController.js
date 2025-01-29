import User from "../models/User.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateTokenUtils.js"
import setCookie from "../utils/setCookieUtils.js"

export const signup = async (req, res) => {
    const { fullName, username, password, email } = req.body

    try {
        const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/
        if(!usernameRegex.test(username)) {
            return res.status(400).json({ message: "Invalid username" })
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if(!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Invalid password" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }

        const existingUsername = await User.findOne({ username })
        if(existingUsername) {
            return res.status(400).json({ message: "Username is already taken" })
        }

        const existingEmail = await User.findOne({ email })
        if(existingEmail) {
            return res.status(400).json({ message: "Email is already taken" })
        }

        const saltRounds = 10 
        const salt = await bcrypt.genSalt(saltRounds) 
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = await User.create({ fullName, username, password: hashedPassword, email })

        const token = generateToken(newUser._id) 
        setCookie(res, token)

        res.status(201).json({ message: "User Created", data: newUser })
    }
    catch(error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }) 
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id)
        setCookie(res, token)

        res.status(200).json({ message: "Successful Login" })
    }
    catch(error) {
        res.status(500).json({ message: "Internal Server Error" }) 
    }
}

export const logout = async (req, res) => {
    res.send("Logout")
}
