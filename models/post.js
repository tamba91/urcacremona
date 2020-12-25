var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema(
    {
        Titolo: { type: String },
        Testo: { type: String },
        Media_Paths: { type: [String] },
        Autore: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        Data: { type: Date, default: Date.now }

    }
)

postSchema.virtual('Prequel')
    .get(function () {
        return this.Testo.substr(0, 250)
    })

module.exports = mongoose.model('post', postSchema);