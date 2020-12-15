/*
Link Utili
- titolo: string
- descrizione: string
- link: string
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
	titolo: String,
	indirizzo: String,
	descrizione: String
});

module.exports = mongoose.model('linkUtili', LinkSchema);
