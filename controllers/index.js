const User = require('../models/paziente');
const passport = require('passport');
const linkUtili = require('../models/linkUtili');
module.exports = {
	/* async postRegister(req, res, next) {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			image: req.body.image
		});

		await User.register(newUser, req.body.password);
		res.redirect('/');
	}, */
	postLogin(req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
		})(req, res, next);
	},
	getLogout(req, res, next) {
		req.logout();
		res.redirect('/');
	},
	async getLink(req, res, next) {
		const link = await linkUtili.find();
		res.render('linkUtili', { link });
	},
};
