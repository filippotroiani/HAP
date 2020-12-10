/*
Paziente
- CF: string
- cognome: string
- nome: string
- dataNascita: date
- residenza: string
- email: string
- numTelefono: string
- medico: Object ref Staff
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	CF: String,
	cognome: String,
	nome: String,
	dataNascita: Date,
	residenza: String,
	numTelefono: String,
	email: String,
	medico: {
		type: Schema.Types.ObjectId,
		ref: 'Staff'
	}
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
