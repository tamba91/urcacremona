var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new Schema (
    {
        Argomento : {type: String, required: true},
        N : {type: Number, required: true},
        Domanda : {type: String, required: true},
        Risposte : [{type: String}],
        Risposta_Esatta : {type: Number, required: true}
    }
)

module.exports = mongoose.model('question', questionSchema);