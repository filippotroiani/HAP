const express = require('express');
const Orario = require('../models/orario');
const router = express.Router();
const {
	newPrenotazioni,
	createPrenotazioni,
	indexPrenotazioni,
	deletePrenotazioni,
	indexSegreteria
} = require('../controllers/prenotazioni');
const { asyncErrorHandler } = require('../middleware');

/* GET index /prenotazioni */
router.get('/', indexPrenotazioni);

/* GET new /prenotazioni/new */
router.get('/new', asyncErrorHandler(newPrenotazioni));

/* GET new /prenotazioni/segreteria */
router.get('/segreteria', indexSegreteria);

/* POST create /prenotazioni */
router.post('/', asyncErrorHandler(createPrenotazioni));

/* GET show /prenotazioni/:id_prenotazione */
router.get('/:id_prenotazione', (req, res, next) => {
	res.send('SHOW /prenotazioni/:id_prenotazione');
});

/* GET edit /prenotazioni/:id_prenotazione */
router.get('/:id_prenotazione/edit', (req, res, next) => {
	res.send('EDIT /prenotazioni/:id_prenotazione/edit');
});

/* PUT update /prenotazioni/:id_prenotazione */
router.put('/:id_prenotazione', (req, res, next) => {
	res.send('EDIT /prenotazioni/:id_prenotazione');
});

/* DELETE destroy /prenotazioni/:id_prenotazione */
router.delete('/:id_prenotazione', asyncErrorHandler(deletePrenotazioni));

module.exports = router;
