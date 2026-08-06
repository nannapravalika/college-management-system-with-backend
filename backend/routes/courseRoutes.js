const express = require("express");

const router = express.Router();

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByDepartment
} = require("../controllers/courseController");

// =====================================
// Public Authenticated Routes
// =====================================

// Get All Courses
router.get("/", protect, getCourses);

// Get Courses By Department
router.get(
    "/department/:departmentId",
    protect,
    getCoursesByDepartment
);

// Get Single Course
router.get("/:id", protect, getCourse);

// =====================================
// Admin Only Routes
// =====================================

// Create Course
router.post(
    "/",
    protect,
    adminOnly,
    createCourse
);

// Update Course
router.put(
    "/:id",
    protect,
    adminOnly,
    updateCourse
);

// Delete Course
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCourse
);

module.exports = router;