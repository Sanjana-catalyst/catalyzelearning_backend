const mongoose = require("mongoose");

const DeadlinesSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId
    },
    coursesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    ],
    assignments: [
        {
            assignmentId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            assignmentName: {
                type: String,
                required: true
            }
        }
    ]
}, {timestamps: true});
 
const Deadlines = mongoose.model('Deadlines', DeadlinesSchema);
module.exports = Deadlines;