import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

/* ✅ SEND EMAIL TO USER */
router.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: "Missing email data" });
    }

    const transporter = nodemailer.createTransport({
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
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);
    res.status(500).json({ message: "Email send failed" });
  }
});

export default router;
