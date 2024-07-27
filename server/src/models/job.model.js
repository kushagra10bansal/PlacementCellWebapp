import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        // jobId: {
        //     type: String,
        //     required: true,
        //     unique: true,
        //     trim: true,
        //     index: true
        // },
        companyName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        batch: {
            type: Number
        },
        type: {
            type: String,
            required: true,
            trim: true,
            enum: ['Intern', 'Full-Time', 'intern', 'full-time']
        },
        salary: {
            type: Number,
        },      
        cgpa: {
            type: Number,
        },
        role: {
            type: String,
            trim: true,
        },
        branches: {
            type: [String],
        },
        registerBy: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true
        },
        testDate: {
            type: Date,
        },
        logo: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        },
    },
    {
        timestamps: true
    }
)

export const Job = mongoose.model('Job', jobSchema);