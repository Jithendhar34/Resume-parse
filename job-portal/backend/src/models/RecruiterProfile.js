"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recruiterProfileSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: String,
    companyWebsite: String,
    jobTitle: String,
    jobDescription: String,
    requiredSkills: [String],
}, { timestamps: true });
// ✅ SAFE EXPORT (FIXES Nodemon Crash)
const RecruiterProfile = mongoose_1.default.models.RecruiterProfile ||
    mongoose_1.default.model("RecruiterProfile", recruiterProfileSchema);
exports.default = RecruiterProfile;
