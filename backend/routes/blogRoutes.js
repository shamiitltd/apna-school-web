import express from "express";

import {
  getBlogs,
  getDashboardStats,
  getPopularBlogs,
  getFeaturedBlog,
  getCategoryCounts,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkDeleteBlogs,
  bulkUpdateStatus,
  toggleLikeBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// Specific routes first to prevent collision with /:id
router.get("/dashboard-stats", getDashboardStats);
router.get("/popular", getPopularBlogs);
router.get("/featured", getFeaturedBlog);
router.get("/categories", getCategoryCounts);
router.post("/bulk-delete", bulkDeleteBlogs);
router.post("/bulk-status", bulkUpdateStatus);

// Generic collection routes
router.get("/", getBlogs);
router.post("/", createBlog);

// Single item routes
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.post("/:id/like", toggleLikeBlog);

export default router;