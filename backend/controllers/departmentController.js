const Department = require("../models/Department");

// Get all departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find().sort({ createdAt: -1 });
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get department by ID
exports.getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.json(department);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create department
exports.createDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(201).json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update department
exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(department);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);

        res.json({
            message: "Department deleted successfully"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};