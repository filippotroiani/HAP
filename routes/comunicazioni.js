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
const { asyncErrorHandler } = require('../middleware');

/* GET index /comunicazioni */
router.get('/', indexComunicazione);

/* GET more comunicazioni /comunicazioni */
router.get('/loadComunicazioni', asyncErrorHandler(loadComunicazione));

/* GET new /comunicazioni/new */
router.get('/new', newComunicazione);

/* POST create /comunicazioni */
router.post('/', asyncErrorHandler(createComunicazione));

/* GET show /comunicazioni/:id_comunicazione */
router.get('/:id_comunicazione', asyncErrorHandler(showComunicazione));

/* GET edit /comunicazioni/:id_comunicazione */
router.get('/:id_comunicazione/edit', asyncErrorHandler(editComunicazione));

/* PUT update /comunicazioni/:id_comunicazione */
router.put('/:id_comunicazione', asyncErrorHandler(updateComunicazione));

/* DELETE destroy /comunicazioni/:id_comunicazione */
router.delete('/:id_comunicazione', asyncErrorHandler(deleteComunicazione));

module.exports = router;
