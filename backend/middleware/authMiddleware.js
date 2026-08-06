const jwt = require("jsonwebtoken");

// ===========================
// Verify JWT Token
// ===========================
const protect = (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};

// ===========================
// Admin Only
// ===========================
const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Admin access required."
        });

    }

    next();

};

// ===========================
// Faculty or Admin
// ===========================
const facultyOrAdmin = (req, res, next) => {

    if (
        req.user.role !== "admin" &&
        req.user.role !== "faculty"
    ) {

        return res.status(403).json({
            success: false,
            message: "Faculty or Admin access required."
        });

    }

    next();

};

module.exports = {
    protect,
    adminOnly,
    facultyOrAdmin
};