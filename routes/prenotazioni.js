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
const { asyncErrorHandler, isUserLogged } = require('../middleware');

/* GET index /prenotazioni */
router.get('/', isUserLogged, indexPrenotazioni);

/* GET new /prenotazioni/new */
router.get('/new', isUserLogged, asyncErrorHandler(newPrenotazioni));

/* GET new /prenotazioni/provaquery SOLO PER PROVARE QUERY ********* */
router.get('/provaquery', isUserLogged, asyncErrorHandler(provaQuery));

/* GET new /prenotazioni/segreteria */
router.get('/segreteria', isUserLogged, indexSegreteria);

/* GET new /prenotazioni/getOrariSegreteriaAPI */
router.get('/getOrariSegreteriaAPI', isUserLogged, asyncErrorHandler(getOrariSegreteriaAPI));

/* GET new /prenotazioni/getOrariMedicoAPI */
router.get('/getOrariMedicoAPI', isUserLogged, asyncErrorHandler(getOrariMedicoAPI));

/* POST create /prenotazioni */
router.post('/', isUserLogged, asyncErrorHandler(createPrenotazioni));

/* GET show /prenotazioni/:id_prenotazione */
router.get('/:id_prenotazione', (req, res, next) => {
	res.send('SHOW /prenotazioni/:id_prenotazione');
});

/* DELETE destroy /prenotazioni/:id_prenotazione */
router.delete('/:id_prenotazione', isUserLogged, asyncErrorHandler(deletePrenotazioni));

module.exports = router;
