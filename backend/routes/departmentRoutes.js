const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment

} = require("../controllers/departmentController");

// ==============================
// Department Routes
// ==============================

// Get All Departments
router.get("/", auth, getDepartments);

// Get Single Department
router.get("/:id", auth, getDepartment);

// Create Department
router.post("/", auth, createDepartment);

// Update Department
router.put("/:id", auth, updateDepartment);

// Delete Department
router.delete("/:id", auth, deleteDepartment);

module.exports = router;