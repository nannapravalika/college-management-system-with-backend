const Course = require("../models/Course");

// ==============================
// Get All Courses
// ==============================

exports.getCourses = async (req, res) => {

    try {

        const courses = await Course.find()
            .populate("department", "departmentName departmentCode")
            .sort({ createdAt: -1 });

        res.status(200).json(courses);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// Get Single Course
// ==============================

exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)
            .populate("department", "departmentName departmentCode");

        if (!course) {

            return res.status(404).json({

                message: "Course not found"

            });

        }

        res.status(200).json(course);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Create Course
// ==============================

exports.createCourse = async (req, res) => {

    try {

        const {

            courseCode,

            courseName,

            credits,

            department

        } = req.body;

        const exists = await Course.findOne({

            courseCode

        });

        if (exists) {

            return res.status(400).json({

                message: "Course Code already exists"

            });

        }

        const course = await Course.create({

            courseCode,

            courseName,

            credits,

            department

        });

        res.status(201).json(course);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Update Course
// ==============================

exports.updateCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!course) {

            return res.status(404).json({

                message: "Course not found"

            });

        }

        res.status(200).json(course);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Delete Course
// ==============================

exports.deleteCourse = async (req, res) => {

    try {

        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {

            return res.status(404).json({

                message: "Course not found"

            });

        }

        res.status(200).json({

            message: "Course deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ==============================
// Get Courses By Department
// ==============================

exports.getCoursesByDepartment = async (req, res) => {

    try {

        const courses = await Course.find({

            department: req.params.departmentId

        });

        res.status(200).json(courses);

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};