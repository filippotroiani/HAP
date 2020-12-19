var express = require('express');
var router = express.Router();
const {
	usersIndex,
	postLogin,
	getLogout,
	postRegister,
	postRegisterStaff
} = require('../controllers/users'); // /index è sottinteso
const { asyncErrorHandler } = require('../middleware'); // /index è sottinteso

router.get('/', asyncErrorHandler(usersIndex));

/* GET /login */
router.get('/login', (req, res, next) => {
	res.send('GET /login');
});

/* POST /login */
router.post('/login', postLogin);

/* GET /register */
router.get('/register', (req, res, next) => {
	res.send('GET /register');
});

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /logout */
router.get('/logout', getLogout);

/* GET /forgot */
router.get('/forgot', (req, res, next) => {
	res.send('GET /forgot');
});

/* GET /forgot */
router.put('/forgot', (req, res, next) => {
	res.send('PUT /forgot');
}); //non c'è bisogno di passare una mail come parametro perché la prenderemo dal request.body con il body parser

/* GET /reset/:token */
router.get('/reset/:token', (req, res, next) => {
	res.send('GET /reset/:token');
});

/* PUT /reset/:token */
router.put('/reset/:token', (req, res, next) => {
	res.send('RESET /reset/:token');
});

/* GET /profile */
router.get('/profile', (req, res, next) => {
	res.send('GET /profile');
});

/* PUT /profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
	res.send('UPDATE /profile/:user_id');
});

/* GET /registerstaff */
router.get('/registerstaff', (req, res, next) => {
	res.send('GET /registerStaff');
});

/* POST /registerstaff */
router.post('/registerstaff', asyncErrorHandler(postRegisterStaff));

module.exports = router;
