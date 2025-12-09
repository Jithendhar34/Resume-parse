import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    companyName: String,
    companyWebsite: String,

    jobTitle: String,
    jobDescription: String,

    requiredSkills: [String],
  },
  { timestamps: true }
);

// ✅ SAFE EXPORT (FIXES Nodemon Crash)
const RecruiterProfile =
  mongoose.models.RecruiterProfile ||
  mongoose.model("RecruiterProfile", recruiterProfileSchema);

export default RecruiterProfile;
