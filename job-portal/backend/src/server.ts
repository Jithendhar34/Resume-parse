import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import studentRoutes from "./routes/studentRoutes";
import recruiterRoutes from "./routes/recruiterRoutes";
import emailRoutes from "./routes/emailRoutes"; // ✅ EMAIL ROUTE

dotenv.config();

const app = express();

/* ✅ FIXED CORS */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/email", emailRoutes); // ✅ IMPORTANT

app.get("/", (req, res) => {
  res.send("✅ API Running...");
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
