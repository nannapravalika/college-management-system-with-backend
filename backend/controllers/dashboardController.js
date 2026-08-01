const Student = require("../models/Student");
const Department = require("../models/Department");
const Course = require("../models/Course");

exports.getDashboard = async (req, res) => {

    try {

        const totalStudents = await Student.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalCourses = await Course.countDocuments();

        const recentStudents = await Student.find()

            .populate("department", "departmentName")

            .populate("course", "courseName")

            .sort({ createdAt: -1 })

            .limit(5);

        res.status(200).json({

            totalStudents,

            totalDepartments,

            totalCourses,

            recentStudents

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};