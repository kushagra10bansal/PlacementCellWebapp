import { Router } from "express";
import { createBlog, deleteBlog, getBlogs, getBlog, getCompanyBlogs } from "../controllers/blog.controller.js";

const router = Router()

router.get("/", getBlogs);
router.post('/', createBlog)
router.get("/:id", getBlog);
router.get("/company/:companyName", getCompanyBlogs);
router.delete("/:id", deleteBlog);

export default router