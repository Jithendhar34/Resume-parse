"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = express_1.default.Router();
/* ✅ SEND EMAIL TO USER */
router.post("/send-email", async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        if (!to || !subject || !message) {
            return res.status(400).json({ message: "Missing email data" });
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // ✅ your gmail
                pass: process.env.EMAIL_PASS, // ✅ gmail app password
            },
        });
        await transporter.sendMail({
            from: `"SmartReach" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text: message,
        });
        res.json({ message: "✅ Email sent successfully" });
    }
    catch (error) {
        console.error("❌ EMAIL SEND ERROR:", error);
        res.status(500).json({ message: "Email send failed" });
    }
});
exports.default = router;
