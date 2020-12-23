module.exports = {
	asyncErrorHandler: (fn) => (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	},
	isStaffMember: (req, res, next) => {
		if (req.user.tipo === 'Staff' || req.user.tipo === 'Admin') return next();
		req.session.error = 'Non sei autorizzato ad accedere a questa pagina.';
		res.status(403);
		return res.redirect('back');
	},
	isAdmin: (req, res, next) => {
		if (req.user.tipo === 'Admin') return next();
		req.session.error = 'Non sei autorizzato ad accedere a questa pagina.';
		res.status(403);
		return res.redirect('back');
	}
};
