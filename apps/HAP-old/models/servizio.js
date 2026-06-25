/*
Servizio
- nome: string
- descrizione: string
- tipo: string
- chiEroga: string
- prezzo?: number
*/

const monngoose = require('mongoose');
const Schema = mongoose.Schema;

const ServizioSchema = new Schema(
	{
		nome: String,
		descrizione: String,
		//chiEroga: String,
		prezzo: Number
	},
	{ collection: 'Servizi' }
);

module.exports = mongoose.model('Servizio', ServizioSchema);
