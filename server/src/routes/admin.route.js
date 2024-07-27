import { Router } from "express";
import { 
    adminLogin,
    adminLogout
} from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";
import { createJob, deleteJob, makeJobInactive, fetchJob, fetchAllJobs, inActiveJobs, generateReport } from "../controllers/job.controller.js";
import { upload } from "../middlewares/multer.js"


const router = Router()

router.route("/login").post(adminLogin)
router.delete("/logout", verifyAdminJWT, adminLogout)
router.post("/job", verifyAdminJWT, upload.single("logo"), createJob)
router.get("/job", verifyAdminJWT, fetchAllJobs)
router.get("/job/:id", verifyAdminJWT, fetchJob)
router.delete("/job/:id", verifyAdminJWT, deleteJob)
router.put("/job/:id", verifyAdminJWT, makeJobInactive)
router.get("/job/inactive", verifyAdminJWT, inActiveJobs)
router.get("/job/report/:id", verifyAdminJWT, generateReport)


export default router