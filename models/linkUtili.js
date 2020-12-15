/*
Link Utili
- titolo: string
- descrizione: string
- link: string
 */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
	titolo: String,
	link: String,
	descrizione: String,
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('LinkUtili', UserSchema);
