import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true, 
    }, 

    username: {
        type: String, 
        required: true, 
    }, 

    password: {
        type: String, 
        required: true,
        minlength: 6, 
    }, 

    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
    }, 

    profilePic: {
        type: String, 
        required: "", 
    }, 

}, { timestamps: true }) 

const User = new mongoose.model("User", userSchema)
export default User 