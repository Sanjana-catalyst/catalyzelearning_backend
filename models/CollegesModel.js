const mongoose = require('mongoose');

const CollegesSchema = new mongoose.Schema({
    collegeId : {
        type : mongoose.Schema.Types.ObjectId
    },
    collegeName : {
        type : String
    },
    studentsEnrolledFromCollege : {
        type : String
    }
}, {timestamps: true});

const Colleges = mongoose.model('Colleges', CollegesSchema);
module.exports = Colleges;