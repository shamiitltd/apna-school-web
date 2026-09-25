import express from "express";
import { adminLogin, verifyAdmin, updateAdminPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/verify", verifyAdmin);
router.put("/change-password", updateAdminPassword);

export default router;
