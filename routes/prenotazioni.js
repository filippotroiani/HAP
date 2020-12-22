const express = require('express');
const router = express.Router();
const {
	newPrenotazioni,
	createPrenotazioni,
	indexPrenotazioni
} = require('../controllers/prenotazioni');
const { asyncErrorHandler } = require('../middleware');

/* GET index /prenotazioni */
router.get('/', indexPrenotazioni);

/* GET new /prenotazioni/new */
router.get('/new', asyncErrorHandler(newPrenotazioni));

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
router.delete('/:id_prenotazione', (req, res, next) => {
	res.send('DELETE /prenotazioni');
});

module.exports = router;
