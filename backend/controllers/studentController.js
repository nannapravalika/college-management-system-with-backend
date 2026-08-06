const Student = require("../models/Student");

// =======================================
// Get All Students
// Supports Search
// =======================================

exports.getStudents = async (req, res) => {

    try {

        const search = req.query.search || "";

        let filter = {};

        if (search) {

            filter = {

                $or: [

                    { studentId: { $regex: search, $options: "i" } },

                    { studentName: { $regex: search, $options: "i" } },

                    { studentEmail: { $regex: search, $options: "i" } }

                ]

            };

        }

        const students = await Student.find(filter)

            .populate("department", "departmentName departmentCode")

            .populate("course", "courseName courseCode")

            .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            students

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
// Get Single Student
// =======================================

exports.getStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id)

            .populate("department", "departmentName departmentCode")

            .populate("course", "courseName courseCode");

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"

            });

        }

        res.status(200).json({

            success: true,

            student

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
// Create Student
// =======================================

exports.createStudent = async (req, res) => {

    try {

        const {

            studentId,

            studentName,

            studentEmail,

            studentPhone,

            department,

            course

        } = req.body;

        const exists = await Student.findOne({

            $or: [

                { studentId },

                { studentEmail }

            ]

        });

        if (exists) {

            return res.status(400).json({

                success: false,

                message: "Student ID or Email already exists"

            });

        }

        const student = await Student.create({

            studentId,

            studentName,

            studentEmail,

            studentPhone,

            department,

            course

        });

        res.status(201).json({

            success: true,

            message: "Student added successfully.",

            student

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
// Update Student
// =======================================

exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"

            });

        }

        const duplicate = await Student.findOne({

            _id: { $ne: req.params.id },

            $or: [

                { studentId: req.body.studentId },

                { studentEmail: req.body.studentEmail }

            ]

        });

        if (duplicate) {

            return res.status(400).json({

                success: false,

                message: "Student ID or Email already exists"

            });

        }

        Object.assign(student, req.body);

        await student.save();

        res.status(200).json({

            success: true,

            message: "Student updated successfully.",

            student

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
// Delete Student
// =======================================

exports.deleteStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({

                success: false,

                message: "Student not found"

            });

        }

        await student.deleteOne();

        res.status(200).json({

            success: true,

            message: "Student deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};