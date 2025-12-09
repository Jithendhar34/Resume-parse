import express from "express";
import multer from "multer";
import mammoth from "mammoth";
import JobPost from "../models/JobPost";

const router = express.Router();

/* ✅ MEMORY STORAGE */
const upload = multer({
  storage: multer.memoryStorage(),
});

/* ✅ UPLOAD & ANALYZE RESUME */
router.post(
  "/upload-resume/:userId",
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("✅ Upload API hit");

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log(
        "✅ File Received:",
        req.file.originalname,
        req.file.mimetype
      );

      /* ✅ BLOCK PDF FILES (IMPORTANT FIX) */
      if (req.file.mimetype === "application/pdf") {
        return res.status(400).json({
          message: "❌ Please upload resume only in DOCX format (Word file)",
        });
      }

      let text = "";

      /* ✅ DOCX SAFE EXTRACTION */
      const result = await mammoth.extractRawText({
        buffer: req.file.buffer,
      });

      text = result.value;

      /* ✅ SKILL EXTRACTION */
      const skills = extractSkills(text);

      /* ✅ JOB MATCHING */
      const matchedJobs = await JobPost.find({
        skills: { $in: skills },
      });

      res.json({
        skills,
        matchedJobs,
      });
    } catch (err) {
      console.error("❌ RESUME ANALYSIS ERROR:", err);
      res.status(500).json({ message: "Resume analysis failed" });
    }
  }
);

/* ✅ SKILL DETECTOR */
function extractSkills(text: string) {
  const knownSkills = [
    "react",
    "node",
    "express",
    "mongodb",
    "java",
    "typescript",
    "javascript",
    "html",
    "css",
    "git",
  ];

  return knownSkills.filter((skill) =>
    text.toLowerCase().includes(skill)
  );
}

/* ✅ JOB SEED ROUTE */
router.get("/seed-jobs", async (req, res) => {
  await JobPost.insertMany([
    {
      company: "Google",
      role: "Frontend Developer",
      skills: ["react", "javascript", "html", "css"],
      status: "Hiring",
    },
    {
      company: "Amazon",
      role: "Backend Developer",
      skills: ["node", "express", "mongodb"],
      status: "Hiring",
    },
    {
      company: "Microsoft",
      role: "Full Stack Developer",
      skills: ["react", "node", "mongodb"],
      status: "Open",
    },
  ]);

  res.json({ message: "✅ Jobs Seeded Successfully" });
});

export default router;
