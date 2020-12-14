const comunicazione = require('../models/comunicazione');
const Comunicazione = require('../models/comunicazione');

module.exports = {
	async indexComunicazione(req, res, next) {
		res.render('comunicazioni/index');
	},
	async loadComunicazione(req, res, next) {
		let { search = '', skip = 0, limit = 5, sort = 'desc' } = req.query; //acquisisto i valori passati come parametri tramite res.query
		const regex = new RegExp(search); //(escapeRegex(search), "gi");
		skip = parseInt(skip) || 0;
		limit = parseInt(limit) || 5;

		skip = skip < 0 ? 0 : skip;
		limit = Math.min(50, Math.max(1, limit)); // se limit<1 imposta a 1, se limit>50 imposta a 50
		var query = {
			$or: [{ titolo: regex }, { testo: regex }]
		};
		var options = {
			skip,
			limit,
			sort: {
				dataCreazione: sort === 'desc' ? -1 : 1
			}
		};
		var comunicazioni = await Comunicazione.find(query, null, options);
		const total = await Comunicazione.countDocuments(query);
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
		res.render('comunicazioni/new');
	},
	async createComunicazione(req, res, next) {
		//crea una nuova comunicazione e la inserisce nel database
		console.log(req.body);
		var comunicazione = await Comunicazione.create(req.body.comunicazione);
		res.redirect(`/comunicazioni/${comunicazione.id}`);
	},
	async showComunicazione(req, res, next) {
		var comunicazione = await Comunicazione.findById(
			req.params.id_comunicazione
		);
		res.render('comunicazioni/show', { comunicazione });
	},
	async editComunicazione(req, res, next) {
		var comunicazione = await Comunicazione.findById(
			req.params.id_comunicazione
		);
		res.render('comunicazioni/edit', { comunicazione });
	},
	async updateComunicazione(req, res, next) {
		await Comunicazione.findByIdAndUpdate(
			req.params.id_comunicazione,
			req.body.comunicazione
		);
		res.redirect(`/comunicazioni/${req.params.id_comunicazione}`);
	},
	async deleteComunicazione(req, res, next) {
		await Comunicazione.findByIdAndDelete(req.params.id_comunicazione);
		res.redirect('/comunicazioni');
	}
};
