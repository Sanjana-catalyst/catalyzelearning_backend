const mongoose = require('mongoose');

const QuestionaireSchema = new mongoose.Schema({
    questionId : {
        type : mongoose.Schema.Types.ObjectId
    },
    email : {
        type : String
    },
    question : {
        type : String
    }
}, {timestamps: true})

const Questionaire = mongoose.model('Questionaire', QuestionaireSchema);

module.exports = Questionaire;