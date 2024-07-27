import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job"
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student"
        },
        status: {
            type: String,
            enum: ["applied", "shortlisted", "rejected"],
            default: "applied"
        },
        resume: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Application = mongoose.model('Application', applicationSchema);