const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("College Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);