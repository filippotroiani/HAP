/*
Comunicazione
- titolo: string
- testo: string
- immagine: string
- dataCreazione: string
- parole chiave: [string]
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComunicazioneSchema = new Schema(
	{
		titolo: String,
		testo: String,
		immagine: { type: String, default: '/images/defaultComunicazione.jpg' },
		dataCreazione: { type: Date, default: Date.now },
		paroleChiave: String
	},
	{ collection: 'Comunicazioni' }
);

module.exports = mongoose.model('Comunicazione', ComunicazioneSchema);
