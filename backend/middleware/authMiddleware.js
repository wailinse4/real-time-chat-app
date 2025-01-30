import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt // Access jwt from the cookie before request reaches server
        if(!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" })  // If no token -> unauthorized 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) // If yes token -> decode the token -> access the userId from token
        req.user = decoded // If authenticated -> store decoded user data from the token in the request object
        next() // Pass control to next middleware or route handler 

        // The user data can now be accessed in the request object 
    }
    catch(error) {
        console.log("Error in authenticateToken Middleware");
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}
export default authenticateToken