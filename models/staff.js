/*
Staff
- CF: String
- cognome: String
- nome: String
- email: String
- numTelefono: String
- ruolo: String
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
	CF: String,
	cognome: String,
	nome: String,
	email: String,
	numTelefono: String,
	ruolo: String
});
StaffSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', StaffSchema);
