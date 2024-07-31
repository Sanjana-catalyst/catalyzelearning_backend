const mongoose = require('mongoose');
const { type } = require('os');

const CoursesSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId
    },
    courseName : {
        type : String
    },
    courseDescription : {
        type : String
    },
    peopleEnrolled : {
        type : String
    }
}, { timestamps: true} )

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;