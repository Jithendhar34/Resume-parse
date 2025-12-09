"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
/* ✅ REGISTER */

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields required" });
        }
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hash,
            role,
        });
        res.status(201).json({
            message: "✅ Registration successful",
            user,
        });
    }
    catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ message: "Registration failed" });
    }
});
/* ✅ LOGIN */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: "Invalid password" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            message: "✅ Login successful",
            token,
            user,
        });
    }
    catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Login failed" });
    }
});
exports.default = router;
