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

router.get("/", auth, getDepartments);
router.get("/:id", auth, getDepartment);
router.post("/", auth, createDepartment);
router.put("/:id", auth, updateDepartment);
router.delete("/:id", auth, deleteDepartment);

module.exports = router;