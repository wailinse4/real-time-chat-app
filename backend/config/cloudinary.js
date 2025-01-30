import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"

dotenv.config() 

cloudinary.config({
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME, 
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY, 
    cloudinarySecret: process.env.CLOUDINARY_SECRET
})

export default cloudinary