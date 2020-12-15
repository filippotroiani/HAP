const Prenotazione = require('../models/prenotazione');
const Paziente = require('../models/paziente');
module.exports = {
	indexPrenotazioni(req, res, next) {
		res.render('prenotazioni/index');
	},
	newPrenotazioni(req, res, next) {
		res.render('prenotazioni/new');
	},
	createPrenotazioni(req, res, next) {
		//user temporaneo di sviluppo
		req.body.prenotazione.paziente=req.user._id;
		const medico=(await Paziente.findById(req.user._id)).medico;
		req.body.prenotazione.medico=medico;
		const prenotazione= await Prenotazione.create(req.body.prenotazione);
		
	}
};
