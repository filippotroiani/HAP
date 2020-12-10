const Comunicazione = require('../models/comunicazione');

module.exports = {
	async getComunicazioni(req, res, next) {
		let { search = '', skip = 0, limit = 5, sort = 'desc' } = req.query; //acquisisto i valori passati come parametri tramite res.query
		const regex = new RegExp(search); //(escapeRegex(search), "gi");
		skip = parseInt(skip) || 0;
		limit = parseInt(limit) || 5;

		skip = skip < 0 ? 0 : skip;
		limit = Math.min(50, Math.max(1, limit)); // se limit<1 imposta a 1, se limit>50 imposta a 50
		var comunicazioni = await Comunicazione.find({
			/*{
                $or: [{ titolo: regex }, { testo: regex }]
            },
            {
                skip,
                limit, 
                sort: {
                data: sort === "desc" ? -1 : 1
                }
            } */
		});
		console.log(comunicazioni);
		const total = comunicazioni.length;
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
	async createComunicazione(req, res, next) {
		//crea una nuova comunicazione e la inserisce nel database
		var comunicazione = await Comunicazione.create(req.body);
		res.redirect(`/comunicazioni/${comunicazione.id}`);
	}
};
