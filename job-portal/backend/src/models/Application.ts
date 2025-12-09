import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recruiterProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RecruiterProfile",
      required: true,
    },

    studentProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },

    status: {
      type: String,
      enum: ["applied", "reviewed", "shortlisted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);

export default Application;
