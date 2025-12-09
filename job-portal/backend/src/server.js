"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const recruiterRoutes_1 = __importDefault(require("./routes/recruiterRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes")); // ✅ EMAIL ROUTE
dotenv_1.default.config();
const app = (0, express_1.default)();
/* ✅ FIXED CORS */
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes_1.default);
app.use("/api/student", studentRoutes_1.default);
app.use("/api/recruiter", recruiterRoutes_1.default);
app.use("/api/email", emailRoutes_1.default); // ✅ IMPORTANT
app.get("/", (req, res) => {
    res.send("✅ API Running...");
});
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
