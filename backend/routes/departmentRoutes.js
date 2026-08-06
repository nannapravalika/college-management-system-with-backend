const express = require("express");

const router = express.Router();

const {
    protect,
    adminOnly,
    facultyOrAdmin
} = require("../middleware/authMiddleware");

const {

    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment

} = require("../controllers/departmentController");

// =======================================
// View Departments
// (Faculty + Admin)
// =======================================

router.get(
    "/",
    protect,
    facultyOrAdmin,
    getDepartments
);

router.get(
    "/:id",
    protect,
    facultyOrAdmin,
    getDepartment
);

// =======================================
// Admin Only
// =======================================

router.post(
    "/",
    protect,
    adminOnly,
    createDepartment
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateDepartment
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteDepartment
);

module.exports = router;