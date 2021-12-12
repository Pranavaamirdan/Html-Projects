const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name :{
        type : mongoose.SchemaTypes.String,
        required : true
    },
    email :{
        type : mongoose.SchemaTypes.String,
        required : true
    },
    password :{
        type : mongoose.SchemaTypes.String,
        required : true
    },
    date :{
        type : mongoose.SchemaTypes.Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', UserSchema); 