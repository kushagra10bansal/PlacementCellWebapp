import { Router } from "express";
import { verifyStudentJWT } from "../middlewares/studentAuth.middleware.js"
import { upload } from "../middlewares/multer.js"
import { createApplication } from "../controllers/application.controller.js";


const router = Router()

router.post("/", verifyStudentJWT, upload.single("resume"), createApplication)

export default router