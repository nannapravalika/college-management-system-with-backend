const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByDepartment

} = require("../controllers/courseController");

// ==============================
// Course Routes
// ==============================

// Get All Courses
router.get("/", auth, getCourses);

// Get Single Course
router.get("/:id", auth, getCourse);

// Get Courses By Department
router.get("/department/:departmentId", auth, getCoursesByDepartment);

// Create Course
router.post("/", auth, createCourse);

// Update Course
router.put("/:id", auth, updateCourse);

// Delete Course
router.delete("/:id", auth, deleteCourse);

module.exports = router;