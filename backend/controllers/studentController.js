const Student = require("../models/Student");

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get one student
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Create student
exports.createStudent = async (req, res) => {

    try {

        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Update student
exports.updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Delete student
exports.deleteStudent = async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};