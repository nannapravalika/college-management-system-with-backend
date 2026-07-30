const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    studentId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    department: {
        type: String,
        required: true
    },

    course: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);