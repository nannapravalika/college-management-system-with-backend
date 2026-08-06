const express = require("express");

const router = express.Router();

const {
    protect,
    adminOnly,
    facultyOrAdmin
} = require("../middleware/authMiddleware");

const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// =======================================
// View Students (Admin + Faculty)
// =======================================

router.get(
    "/",
    protect,
    facultyOrAdmin,
    getStudents
);

router.get(
    "/:id",
    protect,
    facultyOrAdmin,
    getStudent
);

// =======================================
// Admin Only
// =======================================

router.post(
    "/",
    protect,
    adminOnly,
    createStudent
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateStudent
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteStudent
);

module.exports = router;