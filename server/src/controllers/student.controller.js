import mongoose from "mongoose"
import { Student } from "../models/student.model.js"
import { Application } from "../models/application.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const generateAccessAndRefreshTokens = async (id) => {
    try {
        const user = await Student.findById(id);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const studentLogout = asyncHandler(async (req, res) => {
    // Clear the cookies storing the tokens on the client-side
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
    
        // Invalidate the refresh token on the server-side
        const studentId = req.student.id;
        const user = await Student.findById(studentId);
    
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

const studentLogin = asyncHandler(async (req, res, next) => {
    const { enrollmentNumber, password } = req.body
    console.log(enrollmentNumber);
    const student = await Student.findOne({ enrollmentNumber })

    if (!student) {
        return next(new ApiError(404, "Student not found"))
    }

    const isPasswordValid = await student.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(student._id)

    const loggedInUser = await Student.findById(student._id).select("-password -refreshToken")

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
                "User logged In Successfully"
            )
        )
})

const studentRegister = asyncHandler(async (req, res) => {

    const { fullName, email, enrollmentNumber, password, branch, graduationYear, cgpa } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, enrollmentNumber, password, branch, graduationYear, cgpa].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await Student.findOne({
        $or: [{ enrollmentNumber }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);  

    const student = await Student.create({
        fullName,
        email,
        enrollmentNumber,
        password,
        branch,
        graduationYear,
        cgpa
    })

    const createdUser = await Student.findById(student._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const getApplications = asyncHandler(async (req, res, next) => {
    const studentId = req.student.id;
    const applications = await Application.find({student: studentId});

    return res
        .status(200)
        .json(new ApiResponse(200, applications, "Applications fetched successfully"))
})

export { studentLogin, studentRegister, getApplications, studentLogout }