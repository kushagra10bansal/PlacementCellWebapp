import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        type: {
            type: String,
        },
        batch: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Blog = mongoose.model('Blog', blogSchema);