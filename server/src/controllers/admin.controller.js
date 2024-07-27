import mongoose from "mongoose"
import {Admin} from "../models/admin.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await Admin.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error in generating access and refresh tokens")
    }
}

const adminLogin = asyncHandler(async (req, res, next) => {
    const {userId, password} = req.body
    console.log(userId);
    const admin = await Admin.findOne({userId})
    
    if(!admin){
        return next(new ApiError(404, "Admin not found"))
    }

    const isPasswordValid = await admin.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(admin._id)

    const loggedInUser = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "Admin logged In Successfully"
        )
    )
})

const adminLogout = asyncHandler(async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
    
        // Invalidate the refresh token on the server-side
        const adminId = req.admin.id;
        const user = await Admin.findById(adminId);
    
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        user.refreshToken = undefined; // Invalidate the refresh token
        await user.save({ validateBeforeSave: false });
    
        res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while logging out the user");
    }
});

export { adminLogin, adminLogout }