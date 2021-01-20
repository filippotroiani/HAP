const express = require('express');
const router = express.Router();
const {
	newPrenotazioni,
	createPrenotazioni,
	indexPrenotazioni,
	deletePrenotazioni,
	indexSegreteria,
	getOrariSegreteriaAPI,
	getOrariMedicoAPI,
	provaQuery
} = require('../controllers/prenotazioni');
const { asyncErrorHandler } = require('../middleware');

/* GET index /prenotazioni */
router.get('/', indexPrenotazioni);

/* GET new /prenotazioni/new */
router.get('/new', asyncErrorHandler(newPrenotazioni));

/* GET new /prenotazioni/provaquery SOLO PER PROVARE QUERY ********* */
router.get('/provaquery', asyncErrorHandler(provaQuery));

/* GET new /prenotazioni/segreteria */
router.get('/segreteria', indexSegreteria);

/* GET new /prenotazioni/getOrariSegreteriaAPI */
router.get('/getOrariSegreteriaAPI', asyncErrorHandler(getOrariSegreteriaAPI));

/* GET new /prenotazioni/getOrariMedicoAPI */
router.get('/getOrariMedicoAPI', asyncErrorHandler(getOrariMedicoAPI));

/* POST create /prenotazioni */
router.post('/', asyncErrorHandler(createPrenotazioni));

/* GET show /prenotazioni/:id_prenotazione */
router.get('/:id_prenotazione', (req, res, next) => {
	res.send('SHOW /prenotazioni/:id_prenotazione');
});

/* GET edit /prenotazioni/:id_prenotazione NON CI SARA' */
router.get('/:id_prenotazione/edit', (req, res, next) => {
	res.send('EDIT /prenotazioni/:id_prenotazione/edit');
});

/* PUT update /prenotazioni/:id_prenotazione NON CI SARA' */
router.put('/:id_prenotazione', (req, res, next) => {
	res.send('EDIT /prenotazioni/:id_prenotazione');
});

/* DELETE destroy /prenotazioni/:id_prenotazione */
router.delete('/:id_prenotazione', asyncErrorHandler(deletePrenotazioni));

module.exports = router;
