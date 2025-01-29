import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongo_uri = process.env.MONGO_URI
const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri)
        console.log("MongoDB Connected")
    }
    catch(error) {
        console.log("MongoDB Connection Error")
        process.exit(1)
    }
}
export default connectDB