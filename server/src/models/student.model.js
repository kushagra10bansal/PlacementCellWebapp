import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"

const studentSchema = new Schema(
    {
        enrollmentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        branch: {
            type: String,
            required: true,
            trim: true,
        },
        graduationYear: {
            type: Number,
            required: true,
        },
        cgpa: {
            type: Number,
            required: true,
        },        
    },
    {
        timestamps: true
    }
)

studentSchema.methods.isPasswordCorrect = async function(password){
    // return await bcrypt.compare(password, this.password)
    return password === this.password
}

studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            enrollmentNumber: this.enrollmentNumber,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        // "thisisasecretkeyforaccessingtheapplication",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Student = mongoose.model('Student', studentSchema);