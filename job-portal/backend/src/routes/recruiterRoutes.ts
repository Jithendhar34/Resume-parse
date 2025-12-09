import express from "express";
import Application from "../models/Application";

const router = express.Router();

// ✅ RECRUITER INBOX
router.get("/inbox/:recruiterId", async (req, res) => {
  try {
    const applications = await Application.find({
      recruiter: req.params.recruiterId,
    })
      .populate("student", "name email")
      .populate("studentProfile")
      .populate("recruiterProfile")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recruiter inbox" });
  }
});

// ✅ UPDATE STATUS
router.put("/application/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "✅ Status updated",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
});

export default router;
