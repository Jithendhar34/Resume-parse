"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Application_1 = __importDefault(require("../models/Application"));
const router = express_1.default.Router();
// ✅ RECRUITER INBOX
router.get("/inbox/:recruiterId", async (req, res) => {
    try {
        const applications = await Application_1.default.find({
            recruiter: req.params.recruiterId,
        })
            .populate("student", "name email")
            .populate("studentProfile")
            .populate("recruiterProfile")
            .sort({ createdAt: -1 });
        res.json(applications);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch recruiter inbox" });
    }
});
// ✅ UPDATE STATUS
router.put("/application/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({
            message: "✅ Status updated",
            application,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Status update failed" });
    }
});
exports.default = router;
