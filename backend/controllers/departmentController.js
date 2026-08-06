const Department = require("../models/Department");

// =======================================
// Get All Departments
// Supports Search
// =======================================

exports.getDepartments = async (req, res) => {

    try {

        const search = req.query.search || "";

        let filter = {};

        if (search) {

            filter = {

                $or: [

                    {
                        departmentName: {
                            $regex: search,
                            $options: "i"
                        }
                    },

                    {
                        departmentCode: {
                            $regex: search,
                            $options: "i"
                        }
                    },

                    {
                        hod: {
                            $regex: search,
                            $options: "i"
                        }
                    }

                ]

            };

        }

        const departments = await Department.find(filter)

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            departments

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// Get Single Department
// =======================================

exports.getDepartment = async (req, res) => {

    try {

        const department = await Department.findById(req.params.id);

        if (!department) {

            return res.status(404).json({

                success: false,

                message: "Department not found"

            });

        }

        res.status(200).json({

            success: true,

            department

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// Create Department
// =======================================

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

                success: false,

                message: "Department already exists"

            });

        }

        const department = await Department.create({

            departmentName,

            departmentCode,

            hod,

            description

        });

        res.status(201).json({

            success: true,

            message: "Department added successfully.",

            department

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// Update Department
// =======================================

exports.updateDepartment = async (req, res) => {

    try {

        const department = await Department.findById(req.params.id);

        if (!department) {

            return res.status(404).json({

                success: false,

                message: "Department not found"

            });

        }

        const duplicate = await Department.findOne({

            _id: {

                $ne: req.params.id

            },

            $or: [

                {

                    departmentName: req.body.departmentName

                },

                {

                    departmentCode: req.body.departmentCode

                }

            ]

        });

        if (duplicate) {

            return res.status(400).json({

                success: false,

                message: "Department already exists"

            });

        }

        Object.assign(department, req.body);

        await department.save();

        res.status(200).json({

            success: true,

            message: "Department updated successfully.",

            department

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =======================================
// Delete Department
// =======================================

exports.deleteDepartment = async (req, res) => {

    try {

        const department = await Department.findById(req.params.id);

        if (!department) {

            return res.status(404).json({

                success: false,

                message: "Department not found"

            });

        }

        await department.deleteOne();

        res.status(200).json({

            success: true,

            message: "Department deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};