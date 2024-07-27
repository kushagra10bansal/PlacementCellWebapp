import { Job } from "../models/job.model.js"
import { Application } from "../models/application.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from "fs"

const createApplication = asyncHandler(async (req, res) => {
  const { jobId } = req.body;
  const { _id: studentId, cgpa: studentCgpa, graduationYear, branch } = req.student;
  console.log("JobID: ",jobId);
  const job = await Job.findById(jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  const { cgpa: requiredCgpa, batch, branches, registerBy, active } = job;
  const localFilePath = req.file?.path;

  if (!localFilePath){
    throw new ApiError(400, "Resume file is required");
  }

  if (!active) {
    fs.unlinkSync(localFilePath)
    throw new ApiError(400, "Job is not active");
  }

  if (Date.now() > new Date(registerBy)) {
    fs.unlinkSync(localFilePath)
    throw new ApiError(400, "Registration date has been passed");
  }

  let appliedBefore = await Application.findOne({ student: studentId, job: jobId });

  if (appliedBefore) {
    // console.log(appliedBefore);
    fs.unlinkSync(localFilePath)
    throw new ApiError(409, "You have already applied for this job");
  }

  if (graduationYear != batch || studentCgpa < requiredCgpa) {
    fs.unlinkSync(localFilePath)
    throw new ApiError(400, "You are not eligible for this job");
  }

  if (!branches.some(b => b.toLowerCase() === branch.toLowerCase())) {
    fs.unlinkSync(localFilePath)
    throw new ApiError(400, "Your branch is not eligible for this job");
  }

  const response = await uploadOnCloudinary(req.file.path);
  if (!response) {
    fs.unlinkSync(localFilePath)
    return ApiError(500, "Error uploading file to cloudinary")
  }

  const resumeUrl = response.url;

  const application = await Application.create({
    student: studentId,
    job: jobId,
    resume: resumeUrl
  });

  return res.status(201).json(
    new ApiResponse(201, { application }, "Application created successfully")
  );
})

export { createApplication }