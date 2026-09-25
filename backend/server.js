import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscriber", subscriberRoutes);

app.get("/", (req, res) => {
  res.send("Apna School API is running successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});