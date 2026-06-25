/*
Paziente
- CF: string
- cognome: string
- nome: string
- dataNascita: date
- residenza: string
- numTelefono: string
- immagine: String,
- medico: Object ref Staff
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const PazienteSchema = new Schema(
	{
		CF: String,
		cognome: String,
		nome: String,
		sesso: String,
		dataNascita: Date,
		residenza: String,
		numTelefono: String,
		immagine: { type: String, default: 'images/defaultUserImage.png' },
		medico: {
			type: Schema.Types.ObjectId,
			ref: 'Staff'
		}
	},
	{ collection: 'Pazienti' }
);
//PazienteSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Paziente', PazienteSchema);
