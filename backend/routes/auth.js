const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

// ======================================
// Authentication Routes
// ======================================

// Public Route - Login
router.post("/login", login);

// Admin Only - Register New User
router.post(
    "/register",
    protect,
    adminOnly,
    register
);

module.exports = router;