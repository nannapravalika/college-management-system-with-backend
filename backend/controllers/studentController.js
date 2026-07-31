const Student = require("../models/Student");

// ====================================
// Get All Students
// ====================================

exports.getStudents = async (req, res) => {

    try {

        const students = await Student.find()

            .populate("department", "departmentName departmentCode")

            .populate("course", "courseName courseCode")

            .sort({

                createdAt: -1

            });

        res.status(200).json(students);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ====================================
// Get Single Student
// ====================================

exports.getStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id)

            .populate("department", "departmentName departmentCode")

            .populate("course", "courseName courseCode");

        if (!student) {

            return res.status(404).json({

                message: "Student not found"

            });

        }

        res.status(200).json(student);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ====================================
// Create Student
// ====================================

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

                {

                    studentId

                },

                {

                    studentEmail

                }

            ]

        });

        if (exists) {

            return res.status(400).json({

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

        res.status(201).json(student);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ====================================
// Update Student
// ====================================

exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!student) {

            return res.status(404).json({

                message: "Student not found"

            });

        }

        res.status(200).json(student);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ====================================
// Delete Student
// ====================================

exports.deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {

            return res.status(404).json({

                message: "Student not found"

            });

        }

        res.status(200).json({

            message: "Student deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};