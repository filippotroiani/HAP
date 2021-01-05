var express = require('express');
var router = express.Router();
const {
	usersIndex,
	getLogin,
	postLogin,
	postLoginSuccessRedirect,
	getLogout,
	getRegister,
	postRegister,
	postRegisterStaff,
	getRegisterStaff
} = require('../controllers/users'); // /index è sottinteso
const { asyncErrorHandler, isStaffMember, isAdmin } = require('../middleware'); // /index è sottinteso

router.get('/', asyncErrorHandler(usersIndex));

/* GET /users/login */
router.get('/login', getLogin);

/* POST /users/login */
router.post('/login', postLogin /* , postLoginSuccessRedirect */);

/* GET /users/register */
router.get('/register', isStaffMember, getRegister);

/* POST /users/register */
router.post('/register', isStaffMember, asyncErrorHandler(postRegister));

/* GET /users/logout */
router.get('/logout', getLogout);

/* GET /users/forgot */
router.get('/forgot', (req, res, next) => {
	res.send('GET /forgot');
});

/* GET /users/forgot */
router.put('/forgot', (req, res, next) => {
	res.send('PUT /forgot');
}); //non c'è bisogno di passare una mail come parametro perché la prenderemo dal request.body con il body parser

/* GET /users/reset/:token */
router.get('/reset/:token', (req, res, next) => {
	res.send('GET /reset/:token');
});

/* PUT /users/reset/:token */
router.put('/reset/:token', (req, res, next) => {
	res.send('RESET /reset/:token');
});

/* GET /users/profile */
router.get('/profile', (req, res, next) => {
	res.send('GET /profile');
});

/* PUT /users/profile/:user_id */
router.put('/profile/:user_id', (req, res, next) => {
	res.send('UPDATE /profile/:user_id');
});

/* GET /users/register-staff */
router.get('/register-staff', isAdmin, getRegisterStaff);

/* POST /users/register-staff */
router.post('/register-staff', isAdmin, asyncErrorHandler(postRegisterStaff));

module.exports = router;
