const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
    studentId: {
        type: String,
        required: [true, "Student ID is required"],
        unique: true,
        trim: true,
        uppercase: true
    },

    studentName: {
        type: String,
        required: [true, "Student Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    studentEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email"
        ]
    },

    studentPhone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [
            /^[6-9]\d{9}$/,
            "Please enter a valid 10-digit mobile number"
        ]
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: [true, "Department is required"]
    },

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: [true, "Course is required"]
    }

},
{
    timestamps: true,
    versionKey: false
});


// Clean JSON response
studentSchema.set("toJSON", {

    transform(doc, ret) {

        delete ret.__v;

        return ret;

    }

});

module.exports = mongoose.model("Student", studentSchema);