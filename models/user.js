/*
User

- username: String
- email: String
- tipo: String
- staff: Object ref Staff
- paziente: Object ref Paziente
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: String,
		email: String,
		tipo: String,
		idRef: {
			type: Schema.Types.ObjectId,
			required: true,
			refPath: 'tipo'
		}
	},
	{ collection: 'Utenti' }
); //staff: { type: Schema.Types.ObjectId, ref: 'Staff' }
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
