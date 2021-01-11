//schema per evento in bacheca

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var eventSchema = new Schema(
    {
        Data_Evento: {type: Date, required: true},
        Testo_Evento: {type: String, required: true},
        Autore_Evento: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
        Data_Caricamento: { type: Date, default: Date.now }
    }
)

module.exports = mongoose.model('event', eventSchema);