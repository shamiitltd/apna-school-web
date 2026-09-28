import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import sitemapRoutes from "./routes/sitemapRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static uploaded files from frontend/public/uploads
const uploadDir = path.resolve(__dirname, "../frontend/public/uploads");
app.use("/uploads", express.static(uploadDir));

// XML Sitemap endpoints for crawlers
app.use("/", sitemapRoutes);
app.use("/api", sitemapRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Apna School API is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});