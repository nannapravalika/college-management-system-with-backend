const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single course
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json(course);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Create course
exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update course
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(course);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete course
exports.deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);

        res.json({
            message: "Course deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};