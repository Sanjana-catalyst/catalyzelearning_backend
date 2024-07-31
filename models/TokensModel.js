const mongoose = require('mongoose');

const TokensSchema = new mongoose.Schema({
    userId : {
        type : String
    },
    numberOfTokens : {
        type : String
    }
}, {timestamps: true});

const Tokens = mongoose.model('Tokens', TokensSchema);
module.exports = Tokens;