const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UsersDetailsSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    photo: {
        type: String
    }
}, { timestamps: true });

UsersDetailsSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1000000 });

const Users = mongoose.model('Users', UsersDetailsSchema);
module.exports = Users;
