/*
Orario

- orari: String
- intervallo: Number
- descrizione: String
- tipo: String
- servizio: String
- medico: Object ref Staff
- inizioValidità: Date
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrarioSchema = new Schema(
	{
		orari: String,
		intervallo: Number,
		descrizione: String,
		tipo: String,
		servizio: String,
		medico: {
			type: Schema.Types.ObjectId,
			ref: 'Staff'
		},
		inizioValidità: { type: Date, default: Date.now }
	},
	{ collection: 'Orari' }
);
module.exports = mongoose.model('Orario', OrarioSchema);
