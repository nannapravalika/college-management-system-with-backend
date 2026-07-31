const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    studentName: {
        type: String,
        required: true,
        trim: true
    },

    studentEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    studentPhone: {
        type: String,
        required: true,
        trim: true
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);