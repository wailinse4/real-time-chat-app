import User from "../models/User.js"

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
    }
    catch(error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    res.send("Login") 
}

export const logout = async (req, res) => {
    res.send("Logout") 
}
