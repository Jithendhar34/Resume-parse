import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  skills: [String],
  status: String,
});

export default mongoose.model("JobPost", jobSchema);
