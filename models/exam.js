var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var examSchema = new Schema({
    Tipo_Esame: {type: String, required: true},
    Durata: {type: String},
    Composizione:  [{Argomento: {type: String}, Quantitativo: {type: Number}}]
})

module.exports = mongoose.model('exam', examSchema);