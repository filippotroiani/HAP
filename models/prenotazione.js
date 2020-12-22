/*
Prenotazione
- paziente: Object ref Utente
- servizio: Object ref Servizio
- dataPrenotazione: String
- dataCreazione: String
- motivazione: String 
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrenotazioneSchema = new Schema(
	{
		paziente: {
			type: Schema.Types.ObjectId,
			ref: 'Paziente'
		},
		medico: { type: Schema.Types.ObjectId, ref: 'Medico' },
		servizio: String,
		dataPrenotazione: Date,
		dataCreazione: { type: Date, default: Date.now },
		motivazione: String
	},
	{ collection: 'Prenotazioni' }
);

module.exports = mongoose.model('Prenotazione', PrenotazioneSchema);
