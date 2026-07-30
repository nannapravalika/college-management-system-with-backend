const Student = require("../models/Student");
const Department = require("../models/Department");
const Course = require("../models/Course");

exports.getDashboard = async (req, res) => {

    try {

        const totalStudents = await Student.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalCourses = await Course.countDocuments();

        // You don't have a Faculty model yet.
        // Return 0 for now.
        const totalFaculty = 0;

        const recentStudents = await Student.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({

            totalStudents,

            totalDepartments,

            totalCourses,

            totalFaculty,

            recentStudents

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};