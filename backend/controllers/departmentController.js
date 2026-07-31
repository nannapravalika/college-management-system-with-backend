const Department = require("../models/Department");

// ==============================
// Get All Departments
// ==============================

exports.getDepartments = async (req, res) => {

    try {

        const departments = await Department.find().sort({
            createdAt: -1
        });

        res.status(200).json(departments);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// Get Single Department
// ==============================

exports.getDepartment = async (req, res) => {

    try {

        const department = await Department.findById(req.params.id);

        if (!department) {

            return res.status(404).json({
                message: "Department not found"
            });

        }

        res.status(200).json(department);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// Create Department
// ==============================

exports.createDepartment = async (req, res) => {

    try {

        const {

            departmentName,
            departmentCode,
            hod,
            description

        } = req.body;

        const exists = await Department.findOne({

            $or: [

                {
                    departmentName
                },

                {
                    departmentCode
                }

            ]

        });

        if (exists) {

            return res.status(400).json({

                message: "Department already exists"

            });

        }

        const department = await Department.create({

            departmentName,

            departmentCode,

            hod,

            description

        });

        res.status(201).json(department);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Update Department
// ==============================

exports.updateDepartment = async (req, res) => {

    try {

        const department = await Department.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!department) {

            return res.status(404).json({

                message: "Department not found"

            });

        }

        res.status(200).json(department);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Delete Department
// ==============================

exports.deleteDepartment = async (req, res) => {

    try {

        const department = await Department.findByIdAndDelete(req.params.id);

        if (!department) {

            return res.status(404).json({

                message: "Department not found"

            });

        }

        res.status(200).json({

            message: "Department deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};