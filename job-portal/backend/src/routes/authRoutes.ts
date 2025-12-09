import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

/* ✅ REGISTER (DEBUG SAFE VERSION) */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("✅ REGISTER BODY:", req.body); // 👈 DEBUG LOG

    // ✅ Field validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Password hashing
    const hash = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
    });

    console.log("✅ USER CREATED:", user._id); // 👈 CONFIRM DB SAVE

    res.status(201).json({
      message: "✅ Registration successful",
      user,
    });
  } catch (err: any) {
    // ✅ FULL ERROR SHOWN IN TERMINAL
    console.error("❌ REGISTER ERROR FULL:", err);

    res.status(500).json({
      message: err.message || "Registration server failed",
    });
  }
});

/* ✅ LOGIN (UNCHANGED, BUT DEBUG SAFE) */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("✅ LOGIN BODY:", req.body); // 👈 DEBUG LOG

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      message: "✅ Login successful",
      token,
      user,
    });
  } catch (err: any) {
    console.error("❌ LOGIN ERROR FULL:", err);

    res.status(500).json({
      message: err.message || "Login server failed",
    });
  }
});

export default router;
