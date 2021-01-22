const express = require('express');
const router = express.Router();
const {
	indexComunicazione,
	newComunicazione,
	createComunicazione,
	showComunicazione,
	editComunicazione,
	updateComunicazione,
	deleteComunicazione,
	loadComunicazione
} = require('../controllers/comunicazioni');
const { asyncErrorHandler, isStaffMember, isUserLogged } = require('../middleware');

/* GET index /comunicazioni */
router.get('/', indexComunicazione);

/* GET more comunicazioni /comunicazioni */
router.get('/loadComunicazioni', asyncErrorHandler(loadComunicazione));

/* GET new /comunicazioni/new */
router.get('/new', isUserLogged, isStaffMember, newComunicazione);

/* POST create /comunicazioni */
router.post('/', isUserLogged, isStaffMember, asyncErrorHandler(createComunicazione));

/* GET show /comunicazioni/:id_comunicazione */
router.get('/:id_comunicazione', asyncErrorHandler(showComunicazione));

/* GET edit /comunicazioni/:id_comunicazione */
router.get(
	'/:id_comunicazione/edit',
	isUserLogged,
	isStaffMember,
	asyncErrorHandler(editComunicazione)
);

/* PUT update /comunicazioni/:id_comunicazione */
router.put(
	'/:id_comunicazione',
	isUserLogged,
	isStaffMember,
	asyncErrorHandler(updateComunicazione)
);

/* DELETE destroy /comunicazioni/:id_comunicazione */
router.delete(
	'/:id_comunicazione',
	isUserLogged,
	isStaffMember,
	asyncErrorHandler(deleteComunicazione)
);

module.exports = router;
