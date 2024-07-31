const mongoose = require('mongoose');

const AssignmentsSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId
    },
    assignments: [
        {
            assignmentId: {
                type: mongoose.Schema.Types.ObjectId
            },
            assignmentName: {
                type: String
            }
        }
    ]
}, {timestamps: true})

const Assignments = mongoose.model('Assignments', AssignmentsSchema);
module.exports = Assignments;