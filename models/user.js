var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    Nome: {type: String, required: true},
    Cognome: {type: String, required: true},
    Email: {type: String, required: true},
    Password: {type: String, required: true},
    Data: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', userSchema);