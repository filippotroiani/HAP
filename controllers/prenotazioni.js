const Prenotazione = require('../models/prenotazione');
const Orario = require('../models/orario');
const Paziente = require('../models/paziente');
const { calcolaOrariVisite } = require('../middleware/date');
module.exports = {
	indexPrenotazioni(req, res, next) {
		res.render('prenotazioni/index', { title: 'Prenotazioni index - HAP' });
	},
	async newPrenotazioni(req, res, next) {
		const oggi = new Date();
		oggi.setHours(3, 0, 0);
		const prenotazioni = await Prenotazione.find({
			paziente: req.user.idRef,
			dataPrenotazione: { $gte: oggi }
		});
		const orariMedico = await Orario.find(
			{ medico: req.user.medico },
			'orari intervallo'
		);
		const orari = calcolaOrariVisite(
			orariMedico[0].orari,
			orariMedico[0].intervallo
		);
		res.render('prenotazioni/new', {
			title: 'Nuova prenotazione - HAP',
			prenotazioni,
			orari
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
	async showPrenotazione(req, res, next) {
		var prenotazione = await Prenotazione.findById(req.params.id_prenotazione);
		prenotazione.dataCreazione = convertDate(prenotazione.dataCreazione);
		prenotazione.dataPrenotazione = convertDate(prenotazione.dataPrenotazione);
		res.render('prenotazioni/show', {
			title: `Prenotazione ${prenotazione.dataPrenotazione} - HAP`,
			prenotazione
		});
	},
	async deletePrenotazioni(req, res, next) {
		await Prenotazione.findByIdAndDelete(req.params.id_prenotazione);
		req.session.success = 'Prenotazione eliminata con successo.';
		res.redirect('/prenotazioni');
	}
};
