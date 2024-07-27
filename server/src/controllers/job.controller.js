import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Application } from "../models/application.model.js";
import { Student } from "../models/student.model.js";
import { sendMail } from "../utils/mail.js";
import ExcelJS from 'exceljs';
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createJob = asyncHandler(async (req, res) => {
    try {
        let {
            companyName,
            location,
            batch,
            type,
            salary,
            cgpa,
            role,
            branches,
            registerBy,
            testDate
        } = req.body

        // console.log(req.body);
        if (
            [companyName, location, type].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "Required fields cannot be empty")
        }
        
        const localFilePath = req.file?.path;
        let response;
        if (localFilePath){
            response = await uploadOnCloudinary(localFilePath);
        }
        console.log("RESPONSE: ", response);
        if (localFilePath && !response) {
            fs.unlinkSync(localFilePath)
            return ApiError(500, "Error uploading file to cloudinary")
        }

        const logoUrl = await response?.url;
        console.log("LOGOURL: ", logoUrl);
        
        // const existedUser = await Job.findOne({ jobId })

        // if (existedUser) {
        //     throw new ApiError(409, "Job with jobId already exists")
        // }

        branches = branches.split(" ");
        let job = await Job.create({
            // jobId,
            companyName,
            location,
            batch,
            type,
            salary,
            cgpa,
            role,
            branches,
            registerBy,
            logo: logoUrl,
            testDate
        })

        if (!job) {
            throw new ApiError(500, "Something went wrong while creating job")
        }
        
        let students = await Student.find({ graduationYear: batch });

        let unableToSendMail = []

        students.map(async (student) => {
            try {
                await sendMail(student.email, companyName);
            } catch (error) {
                unableToSendMail.push(student.email);
                console.log(error);
            }
        });

        console.log("Unable to send mail to: ", unableToSendMail);

        return res
            .status(200)
            .json(new ApiResponse(200, {job, unableToSendMail}, "Job added successfully"))
    } catch (error) {
        console.log("Error in creating job", error);
        throw new ApiError(500, "Something went wrong while creating job")
    }
})

const deleteJob = asyncHandler(async (req, res, next) => {
    const jobId = req.params.id

    const job = await Job.findByIdAndDelete(jobId)

    if (!job) {
        throw new ApiError(404, "Job not found")
    }

    try {
        return res
            .status(200)
            .json(new ApiResponse(200, job, "Job deleted successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting job")
    }
})

const makeJobInactive = asyncHandler(async (req, res) => {
    const jobId = req.params.id

    const job = await Job.findByIdAndUpdate(jobId, { active: false }, { new: true })

    try {
        return res
            .status(200)
            .json(new ApiResponse(200, job, "Job made inactive successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while making job inactive")
    }
})

const fetchJob = asyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, "Job Not Found");
    }

    try {
        return res
            .status(200)
            .json(new ApiResponse(200, job, "Job fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching jobs")
    }

})

const fetchAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ active: true })

    try {
        return res
            .status(200)
            .json(new ApiResponse(200, jobs, "Jobs fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching jobs")
    }

})

const inActiveJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({ active: false })

    try {
        return res
            .status(200)
            .json(new ApiResponse(200, jobs, "Inactive Jobs fetched successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching inactive jobs")
    }

})

const generateReport = asyncHandler(async (req, res) => {
    try {
        const jobId = req.params.id;
        // const jobIdObjectId = mongoose.Types.ObjectId(jobId);
        const applications = await Application.find({job: jobId});
        if (!applications) {
            throw new ApiError(404, "No applications found");
        }

        // console.log("Applications: ", applications);
    
        const studentPromises = applications.map(async(application) => {
            const studentId = application.student;
            const student = await Student.findById(studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            return {
                enrollmentNumber: student.enrollmentNumber,
                name: student.fullName,
                email: student.email,
                resume: application.resume,
                branch: student.branch,
                cgpa: student.cgpa,
                status: application.status,
            };
        });

        const studentData = await Promise.all(studentPromises);
        
        // console.log("Student Data: ", studentData);
        // export to excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`Applications_${jobId}`);
        worksheet.columns = [
            { header: 'Enrollment Number', key: 'enrollmentNumber', width: 20 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Resume', key: 'resume', width: 50 },
            { header: 'Branch', key: 'branch', width: 20 },
            { header: 'CGPA', key: 'cgpa', width: 10 },
            { header: 'Status', key: 'status', width: 20 },
        ];
    
        studentData.forEach(student => {
            worksheet.addRow({
                enrollmentNumber: student.enrollmentNumber,
                name: student.name,
                email: student.email,
                resume: student.resume,
                branch: student.branch,
                cgpa: student.cgpa,
                status: student.status,
            });
        });
    
        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="applications.xlsx"');
    
        // Write workbook to response stream
        await workbook.xlsx.write(res);
    
        // End response
        res.status(200).end();
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating report")
    }
})

export { createJob, deleteJob, makeJobInactive, fetchJob, fetchAllJobs, inActiveJobs, generateReport }