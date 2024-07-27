import { Router } from "express";
import { 
    studentLogin, studentRegister, getApplications, studentLogout
} from "../controllers/student.controller.js";
import { verifyStudentJWT } from "../middlewares/studentAuth.middleware.js"
import { fetchJob ,fetchAllJobs } from "../controllers/job.controller.js"


const router = Router()

router.post("/login", studentLogin)
router.delete("/logout", verifyStudentJWT, studentLogout)
router.post("/register", studentRegister)
router.get("/job", verifyStudentJWT, fetchAllJobs)
router.get("/job/:id", verifyStudentJWT, fetchJob)
router.get("/applications", verifyStudentJWT, getApplications)


export default router