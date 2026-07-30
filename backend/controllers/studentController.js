const Student = require("../models/Student");

// Get all students
exports.getStudents = async (req, res) => {

    try {

        const students = await Student.find().sort({ createdAt: -1 });

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

// Get single student
exports.getStudent = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Create student
exports.createStudent = async (req, res) => {

    try {

        const newStudent = new Student(req.body);

        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update student
exports.updateStudent = async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }

        );

        res.json(updatedStudent);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete student
exports.deleteStudent = async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};