/*
Staff

- CF: String
- cognome: String
- nome: String
- email: String
- numTelefono: String
- immagine: String,
- ruolo: String
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema(
	{
		CF: String,
		cognome: String,
		nome: String,
		email: String,
		numTelefono: String,
		immagine: { type: String, default: 'images/defaultUserImage.png' },
		ruolo: String
	},
	{ collection: 'Staff' }
);
//StaffSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Staff', StaffSchema);
