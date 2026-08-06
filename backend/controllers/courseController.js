const Course = require("../models/Course");

// =======================================
// Get All Courses
// Supports Search
// =======================================

exports.getCourses = async (req, res) => {

    try {

        const search = req.query.search || "";

        let filter = {};

        if (search) {

            filter = {

                $or: [

                    {
                        courseCode: {
                            $regex: search,
                            $options: "i"
                        }
                    },

                    {
                        courseName: {
                            $regex: search,
                            $options: "i"
                        }
                    }

                ]

            };

        }

        const courses = await Course.find(filter)

            .populate("department", "departmentName departmentCode")

            .sort({

                createdAt: -1

            });

        res.status(200).json({

            success: true,

            courses

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
// Get Single Course
// =======================================

exports.getCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)

            .populate("department", "departmentName departmentCode");

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found"

            });

        }

        res.status(200).json({

            success: true,

            course

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
// Create Course
// =======================================

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

                success: false,

                message: "Course code already exists"

            });

        }

        const course = await Course.create({

            courseCode,

            courseName,

            credits,

            department

        });

        res.status(201).json({

            success: true,

            message: "Course added successfully.",

            course

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
// Update Course
// =======================================

exports.updateCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found"

            });

        }

        const duplicate = await Course.findOne({

            _id: {

                $ne: req.params.id

            },

            courseCode: req.body.courseCode

        });

        if (duplicate) {

            return res.status(400).json({

                success: false,

                message: "Course code already exists"

            });

        }

        Object.assign(course, req.body);

        await course.save();

        res.status(200).json({

            success: true,

            message: "Course updated successfully.",

            course

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
// Delete Course
// =======================================

exports.deleteCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found"

            });

        }

        await course.deleteOne();

        res.status(200).json({

            success: true,

            message: "Course deleted successfully."

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
// Get Courses By Department
// =======================================

exports.getCoursesByDepartment = async (req, res) => {

    try {

        const courses = await Course.find({

            department: req.params.departmentId

        })

        .sort({

            courseName: 1

        });

        res.status(200).json({

            success: true,

            courses

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};