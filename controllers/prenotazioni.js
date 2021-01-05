const Prenotazione = require('../models/prenotazione');
const Paziente = require('../models/paziente');
module.exports = {
	indexPrenotazioni(req, res, next) {
		res.render('prenotazioni/index', { title: 'Prenotazioni index - HAP' });
	},
	async newPrenotazioni(req, res, next) {
		const prenotazioni = await Prenotazione.find({
			paziente: req.user.idRef,
			dataPrenotazione: { $gt: new Date() }
		});
		console.log(prenotazioni);
		res.render('prenotazioni/new', {
			title: 'Nuova prenotazione - HAP',
			prenotazioni
		});
	},
	async createPrenotazioni(req, res, next) {
		if (!req.body) {
			req.session.error = `Seleziona la data e l'orario che preferisci`;
			res.redirect('/prenotazioni');
		} else {
			//const paziente = await Paziente.findById(req.user.idRef);
			const newPrenotazione = {
				paziente: req.user.idRef,
				servizio: req.body.prenotazione.servizio,
				medico: req.user.medico, //paziente.medico,
				dataPrenotazione: new Date(
					req.body.prenotazione.data + 'T' + req.body.prenotazione.ora + ':00'
				),
				motivazione: req.body.prenotazione.motivazione || ''
			};
			const prenotazione = await Prenotazione.create(newPrenotazione);
			req.session.success = 'Prenotazione creata con successo.';
			res.redirect('/prenotazioni/new');
		}
	},
	async deletePrenotazioni(req, res, next) {
		await Prenotazione.findByIdAndDelete(req.params.id_prenotazione);
		req.session.success = 'Prenotazione eliminata con successo.';
		res.redirect('/prenotazioni');
	}
};
