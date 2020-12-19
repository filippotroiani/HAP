const linkUtili = require('../models/linkUtili');
module.exports = {
	async getLink(req, res, next) {
		const elencoLink = await linkUtili.find({});
		res.render('linkUtili', { elencoLink });
	},
	async postLink(req, res, next) {
		await linkUtili.create(req.body.link);
		res.redirect('/link-utili');
	}
};
