import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ SAFE EXPORT (prevents model overwrite & TS crash)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
