const mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    email: String,
    userName: String,
    password: String,

});

module.exports = mongoose.model('user', userSchema)