import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async (req, res) => {
    try {
        let {
            companyName,
            type,
            batch,
            description
        } = req.body

        if (
            [companyName, description].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "Required fields cannot be empty")
        }

        let blog = await Blog.create({
            companyName,
            type,
            batch,
            description
        })

        if (!blog) {
            throw new ApiError(500, "Something went wrong while creating blog")
        }

        res.status(200).json(new ApiResponse(201, "Blog created successfully", blog))
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            throw new ApiError(404, "Blog not found")
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json(new ApiResponse(200, "Blog deleted successfully"))
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getBlogs = asyncHandler(async (req, res) => {
    try {
        let blogs = await Blog.find();

        if (!blogs) {
            throw new ApiError(404, "No blogs found")
        }

        res.status(200).json(new ApiResponse(200, "Blogs fetched successfully", blogs))
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            throw new ApiError(404, "Blog not found")
        }

        res.status(200).json(new ApiResponse(200, "Blog fetched successfully", blog))
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const getCompanyBlogs = asyncHandler(async (req, res) => {
    try {
        const companyName = req.params.companyName;
        const blogs = await Blog.find({ companyName: { $regex: new RegExp(`^${companyName}$`, 'i') } });

        if (!blogs) {
            throw new ApiError(404, "No blogs found for the company");
        }

        res.status(200).json(new ApiResponse(200, "Company blogs fetched successfully", blogs));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export { createBlog, deleteBlog, getBlogs, getBlog, getCompanyBlogs };