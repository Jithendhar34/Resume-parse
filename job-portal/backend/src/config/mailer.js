"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendApplicationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendApplicationEmail = async (recruiterEmail, studentName, studentEmail, resumeUrl, skills) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recruiterEmail,
        subject: "New Job Application Received",
        html: `
      <h2>New Job Application</h2>
      <p><strong>Name:</strong> ${studentName}</p>
      <p><strong>Email:</strong> ${studentEmail}</p>
      <p><strong>Skills:</strong> ${skills.join(", ")}</p>
      <p><strong>Resume:</strong> <a href="${resumeUrl}">View Resume</a></p>
    `,
    });
};
exports.sendApplicationEmail = sendApplicationEmail;
exports.default = transporter;
