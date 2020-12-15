/*
Sezione
- nome: string
- descrizione: string
- tipo: string
- chiEroga: string
- prezzo?: number
*/

const monngoose = require('mongoose');
const Schema = mongoose.Schema;

const SezioneSchema = new Schema({
	nome: String,
	staff: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Staff'
		}
	],
	servizi: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Servizio'
		}
	]
	/*  orari: [{giorno='Lunedì',orario:String},{giorno='Martedì',orario:String},{giorno='Mercoledì',orario:String},{giorno='Giovedì',orario:String},{giorno='Venerdì',orario:String},{giorno='Sabato',orario:String},{giorno='Domenica',orario:String}],
	frequenzaVisite: Number */
});

module.exports = mongoose.model('Servizio', SezioneSchema);
