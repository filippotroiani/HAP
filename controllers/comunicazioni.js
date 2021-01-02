const Comunicazione = require('../models/comunicazione');
const { convertDate } = require('../middleware/date');

module.exports = {
	indexComunicazione(req, res, next) {
		const { parolaChiave } = req.query;
		const title =
			parolaChiave === '' || !parolaChiave
				? 'Comunicazioni - HAP'
				: `${parolaChiave} - Comunicazioni - HAP`;
		res.render('comunicazioni/index', { title, parolaChiave });
	},
	async loadComunicazione(req, res, next) {
		let { search = '', skip = 0, limit = 5, sort = 'desc' } = req.query; //acquisisto i valori passati come parametri tramite res.query
		const regex = new RegExp(search, 'i'); //(escapeRegex(search), "gi");
		skip = parseInt(skip) || 0;
		limit = parseInt(limit) || 5;

		skip = skip < 0 ? 0 : skip;
		limit = Math.min(50, Math.max(1, limit)); // se limit<1 imposta a 1, se limit>50 imposta a 50
		var query = {
			$or: [{ titolo: regex }, { testo: regex }, { paroleChiave: regex }]
		};
		var options = {
			skip,
			limit,
			sort: {
				dataCreazione: sort === 'desc' ? -1 : 1
			}
		};
		const tmpComunicazioni = await Comunicazione.find(query, null, options);
		const total = await Comunicazione.countDocuments(query);
		// converto le date in un formato leggibile. ho bisogno di modificare gli oggetti nell'array restituito da find
		var comunicazioni = tmpComunicazioni.map((comunicazione) => {
			var tmpComunicazione = comunicazione.toObject();
			tmpComunicazione.data = convertDate(comunicazione.dataCreazione);
			return tmpComunicazione;
		});
		/* comunicazioni.forEach(() => {
			comunicazione = comunicazione.toObject().data = convertDate(
				comunicazione.dataCreazione
			);
		}); */
		console.log(comunicazioni);
		res.json({
			//risposta al server
			comunicazioni,
			meta: {
				total,
				skip,
				limit,
				has_more: total - (skip + limit) > 0 //true se ce ne sono ancora, false altrimenti
			}
		});
	},
	newComunicazione(req, res, next) {
		res.render('comunicazioni/new', { title: 'Nuova comunicazione - HAP' });
	},
	async createComunicazione(req, res, next) {
		//crea una nuova comunicazione e la inserisce nel database
		var comunicazione = await Comunicazione.create(req.body.comunicazione);
		req.session.success = 'Comunicazione creata con successo.';
		res.redirect(`/comunicazioni/${comunicazione.id}`);
	},
	async showComunicazione(req, res, next) {
		var comunicazione = await Comunicazione.findById(
			req.params.id_comunicazione
		);
		comunicazione.data = convertDate(comunicazione.dataCreazione);
		res.render('comunicazioni/show', {
			title: `${comunicazione.titolo} - HAP`,
			comunicazione
		});
	},
	async editComunicazione(req, res, next) {
		var comunicazione = await Comunicazione.findById(
			req.params.id_comunicazione
		);
		res.render('comunicazioni/edit', {
			title: 'Modifica comunicazione',
			comunicazione
		});
	},
	async updateComunicazione(req, res, next) {
		await Comunicazione.findByIdAndUpdate(
			req.params.id_comunicazione,
			req.body.comunicazione
		);
		req.session.success = 'Comunicazione modificata con successo.';
		res.redirect(`/comunicazioni/${req.params.id_comunicazione}`);
	},
	async deleteComunicazione(req, res, next) {
		await Comunicazione.findByIdAndDelete(req.params.id_comunicazione);
		req.session.success = 'Comunicazione eliminata con successo.';
		res.redirect('/comunicazioni');
	}
};
