"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recruiter: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recruiterProfile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "RecruiterProfile",
        required: true,
    },
    studentProfile: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true,
    },
    status: {
        type: String,
        enum: ["applied", "reviewed", "shortlisted", "rejected"],
        default: "applied",
    },
}, { timestamps: true });
const Application = mongoose_1.default.models.Application ||
    mongoose_1.default.model("Application", applicationSchema);
exports.default = Application;
