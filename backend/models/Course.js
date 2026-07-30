const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    courseId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    courseName: {
        type: String,
        required: true,
        trim: true
    },

    department: {
        type: String,
        required: true,
        trim: true
    },

    duration: {
        type: String,
        required: true,
        trim: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);