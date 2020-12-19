/*
Prenotazione
- paziente: Object ref Utente
- servizio: Object ref Servizio
- dataPrenotazione: String
- dataCreazione: String
- motivazione: String 
*/

const monngoose = require('mongoose');
const Schema = mongoose.Schema;

const PrenotazioneSchema = new Schema(
	{
		paziente: {
			type: Schema.Types.ObjectId,
			ref: 'Paziente'
		},
		servizio: String,
		dataPrenotazione: Date,
		dataCreazione: Date,
		motivazione: String
	},
	{ collection: 'Prenotazioni' }
);

module.exports = mongoose.model('Prenotazione', PrenotazioneSchema);
