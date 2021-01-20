const User = require('../models/user');
const Paziente = require('../models/paziente');
const Staff = require('../models/staff');
const passport = require('passport');
const user = require('../models/user');

module.exports = {
	// GET /users
	async usersIndex(req, res, next) {
		res.redirect('/');
	},
	// GET /users/login
	getLogin(req, res, next) {
		res.render('users/login', { title: 'Login - HAP' });
	},
	// POST /users/login
	async postLogin(req, res, next) {
		await passport.authenticate(
			'local',
			/* {
				//successRedirect: '/',
				failureRedirect: '/users/login'
			}, */
			(err, user, info) => {
				console.log(user);
				if (err) return next(err);
				if (!user) {
					req.session.error = 'Codice fiscale o password errati.';
					return res.redirect('/users/login');
				}
				req.logIn(user, function (err) {
					if (err) return next(err);
					req.session.success = 'Login effettuato con successo.';
					return user.tipo === 'Staff'
						? res.redirect('/area-riservata') //staff redirect
						: res.redirect('/comunicazioni'); //paziente redirect
				});
			}
		)(req, res, next);
		/* if (user.tipo === 'Staff') res.send('STAFFF');
				else res.send('pazienteee'); */
	},
	postLoginSuccessRedirect(req, res, next) {
		if ('Staff' === 'Staff') res.send('STAFFF');
		else res.send('pazienteee');
	},
	// GET /users/logout
	getLogout(req, res, next) {
		req.logout();
		res.redirect('/');
	},
	// GET /users/register
	getRegister(req, res, next) {
		res.render('/users/register', {
			title: 'Registra nuovo paziente - HAP'
		});
	},
	// POST /users/register
	async postRegister(req, res, next) {
		const newPaziente = {
			CF: req.body.CF,
			cognome: req.body.cognome,
			nome: req.body.nome,
			dataNascita: req.body.dataNascita,
			residenza: req.body.residenza,
			numTelefono: req.body.numTelefono,
			medico: req.body.medico
		};
		const paziente = await Paziente.create(newPaziente);
		const newUser = new User({
			username: paziente.CF,
			email: req.body.email,
			tipo: 'Paziente',
			idRef: paziente._id
		});

		await User.register(newUser, 'pazientepassword');
		res.redirect('/');
	},
	// GET /users/register
	getRegisterStaff(req, res, next) {
		res.render('/users/registerStaff', {
			title: 'Registra nuovo membro dello staff - HAP'
		});
	},
	// POST /users/register-staff
	async postRegisterStaff(req, res, next) {
		const newStaff = {
			CF: req.body.CF,
			cognome: req.body.cognome,
			nome: req.body.nome,
			email: req.body.email,
			numTelefono: req.body.numTelefono,
			ruolo: req.body.ruolo
		};
		const staff = await Staff.create(newStaff);
		const newUser = new User({
			username: staff.CF,
			email: req.body.email,
			tipo: 'Staff',
			idRef: staff._id
		});

		await User.register(newUser, 'staffpassword');
		res.redirect('/');
	}
};
