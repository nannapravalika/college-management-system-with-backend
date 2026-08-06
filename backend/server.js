const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const seedAdmin = require("./seedAdmin");

// Middleware
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// ========================
// Security Middleware
// ========================
app.use(helmet());

// ========================
// Logging
// ========================
app.use(morgan("dev"));

// ========================
// CORS
// ========================
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        credentials: true,
    })
);

// ========================
// Body Parsers
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Serve Frontend
// ========================
app.use(express.static(path.join(__dirname, "..")));

// ========================
// Routes
// ========================
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/studentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);

// ========================
// Health Check
// ========================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully",
        timestamp: new Date(),
    });
});

// ========================
// Home Page
// ========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// ========================
// 404 Handler
// ========================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// ========================
// Global Error Handler
// ========================
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// ========================
// Start Server
// ========================
const startServer = async () => {
    try {
        await connectDB();

        await seedAdmin();

        app.listen(PORT, () => {
            console.log("===================================");
            console.log(`🚀 Server running on Port ${PORT}`);
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("===================================");
        });

    } catch (error) {
        console.error("Server Startup Failed");
        console.error(error.message);
        process.exit(1);
    }
};

startServer();