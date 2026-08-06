const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    courseCode: {
        type: String,
        required: [true, "Course Code is required"],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: 2,
        maxlength: 10
    },

    courseName: {
        type: String,
        required: [true, "Course Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    credits: {
        type: Number,
        required: [true, "Credits are required"],
        min: [1, "Credits must be at least 1"],
        max: [10, "Credits cannot exceed 10"]
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: [true, "Department is required"]
    }

},
{
    timestamps: true,
    versionKey: false
});

 

// Clean JSON Response
courseSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model("Course", courseSchema);