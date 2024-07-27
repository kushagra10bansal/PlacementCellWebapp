import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js";
import { Student } from "../models/student.model.js";

export const verifyLoginJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
        
        let decodedToken;
        let type;

        try {
            decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET)
            type = "admin"
        } catch (error) {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            type = "student"
        }
        
        let user;
        if (type === "admin") {
            user = await Admin.findById(decodedToken?._id).select("-password -refreshToken")
        } else {
            user = await Student.findById(decodedToken?._id).select("-password -refreshToken")
        }
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})