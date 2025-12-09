"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studentProfileSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    headline: String,
    resumeUrl: String,
    resumeText: String,
    skills: [String],
    matchedRecruiterCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// ✅ Prevent model overwrite crash
const StudentProfile = mongoose_1.default.models.StudentProfile ||
    mongoose_1.default.model("StudentProfile", studentProfileSchema);
exports.default = StudentProfile;
