const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
{
    courseCode:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    courseName:{
        type:String,
        required:true,
        trim:true
    },

    credits:{
        type:Number,
        required:true
    },

    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Course", courseSchema);