import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  getMedia,
  uploadMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
  bulkDeleteMedia,
} from "../controllers/mediaController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target frontend/public/uploads directory
const uploadDir = path.resolve(__dirname, "../../frontend/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const router = express.Router();

// Media Routes
router.get("/", getMedia);
router.post("/upload", upload.array("files", 10), uploadMedia);
router.post("/bulk-delete", bulkDeleteMedia);

router.get("/:id", getMediaById);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;
