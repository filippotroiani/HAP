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
	getRegisterStaff,
	getProfile,
	getResetPassword
} = require('../controllers/users'); // /index è sottinteso
const { asyncErrorHandler, isStaffMember, isAdmin, isUserLogged } = require('../middleware'); // /index è sottinteso

router.get('/', asyncErrorHandler(usersIndex));

/* GET /users/login */
router.get('/login', getLogin);

/* POST /users/login */
router.post(
	'/login',
	asyncErrorHandler(postLogin) /* , postLoginSuccessRedirect */
);

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
router.get('/reset/:token', getResetPassword);

/* PUT /users/reset/:token */
router.put('/reset/:token', (req, res, next) => {
	res.send('RESET /reset/:token');
});

/* GET /users/profilo */
router.get('/profilo', isUserLogged, getProfile);

/* PUT /users/profilo/:user_id */
router.put('/profilo/:user_id', (req, res, next) => {
	res.send('UPDATE /profile/:user_id');
});

/* GET /users/register-staff */
router.get('/register-staff', isAdmin, getRegisterStaff);

/* POST /users/register-staff */
router.post('/register-staff', isAdmin, asyncErrorHandler(postRegisterStaff));

module.exports = router;
