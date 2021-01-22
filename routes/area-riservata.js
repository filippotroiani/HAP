const express = require('express');
const router = express.Router();
const {
	asyncErrorHandler,
	isUserLogged,
	isStaffMember,
} = require('../middleware');
const { getPrenotazioni } = require('../controllers/area-riservata-medico');

/* GET index /area-riservata */
router.get('/', isUserLogged, isStaffMember, (req, res, next) => {
	res.send('AREA RISERVATA');
});

/* GET index /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', asyncErrorHandler(getPrenotazioni));

/* GET index /area-riservata/prova */
router.get('/prova', (req, res, next) => {
	const orari = [
		{ ora: '10:15', disponibile: true },
		{ ora: '10:30', disponibile: false },
	];
	res.render('../views/area-riservata/segreteria/aggiungi-prenotazione', {
		title: 'Prova - HAP',
		orari,
	});
});

module.exports = router;
