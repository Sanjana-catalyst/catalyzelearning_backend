const mongoose = require('mongoose');

const UsersDetailsSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId
    },
    collegeId : {
        type : mongoose.Schema.Types.ObjectId
    },
    username : {
        type : String
    },
    password : {
        type : String
    },
    photo : {
        type : String
    }
}, { timestamps: true });

const Users = mongoose.model('Users', UsersDetailsSchema)
module.exports = Users;