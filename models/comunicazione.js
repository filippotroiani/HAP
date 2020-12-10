/*
Comunicazione
- titolo: string
- testo: string
- immagine: string
- dataCreazione: string
- parole chiave: [string]
 */

const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const ComunicazioneSchema = new Schema({
	titolo: String,
	testo: String,
	immagine: String,
	dataCreazione: Date,
	paroleChiave: [String]
});

module.exports = mongoose.model('Comunicazione', ComunicazioneSchema);
