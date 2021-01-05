const linkUtili = require('../models/linkUtili');
module.exports = {
    getHomePage(req, res, next) {
        res.redirect('/comunicazioni');
    },
    async getLink(req, res, next) {
        const elencoLink = await linkUtili.find({});
        res.render('linkUtili', { title: 'Link utili - HAP', elencoLink });
    },
    async postLink(req, res, next) {
        await linkUtili.create(req.body.link);
        res.redirect('/link-utili');
    },
};
