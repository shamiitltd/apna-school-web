import express from "express";

import {
    getBlogs,
    getPopularBlogs,
    getFeaturedBlog,
    getCategoryCounts,
    getBlogById,
    createBlog,
    deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/popular", getPopularBlogs);
router.get("/featured", getFeaturedBlog);
router.get("/categories", getCategoryCounts);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);

export default router;