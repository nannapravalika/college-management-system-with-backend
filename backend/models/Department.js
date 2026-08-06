const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
{
    departmentName: {
        type: String,
        required: [true, "Department Name is required"],
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },

    departmentCode: {
        type: String,
        required: [true, "Department Code is required"],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: 2,
        maxlength: 10
    },

    hod: {
        type: String,
        required: [true, "HOD Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: 500
    }

},
{
    timestamps: true,
    versionKey: false
});
 

// Clean JSON Response
departmentSchema.set("toJSON", {
    transform(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model("Department", departmentSchema);