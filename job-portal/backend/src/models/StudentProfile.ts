import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    headline: String,

    resumeUrl: String,
    resumeText: String,

    skills: [String],

    matchedRecruiterCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite crash
const StudentProfile =
  mongoose.models.StudentProfile ||
  mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;
