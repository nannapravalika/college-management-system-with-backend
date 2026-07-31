const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
    {
        departmentName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        departmentCode: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        hod: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Department", departmentSchema);