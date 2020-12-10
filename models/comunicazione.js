/*
Comunicazione
- titolo: string
- testo: string
- immagine: string
- dataCreazione: string
 */

const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const ComunicazioneSchema = new Schema({
	titolo: String,
	testo: String,
	immagine: String,
	dataCreazione: Date
});

module.exports = mongoose.model('Comunicazione', ComunicazioneSchema);
