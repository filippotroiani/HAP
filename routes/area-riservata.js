const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged, isStaffMember } = require('../middleware');
const { indexAreaRiservata, getPrenotazioniMedico, getPazientiMedico } = require('../controllers/area-riservata');

/* GET index /area-riservata */
router.get('/', isUserLogged, isStaffMember, indexAreaRiservata);

/* GET index /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', isUserLogged, isStaffMember, asyncErrorHandler(getPrenotazioniMedico));

/* GET index /area-riservata/medico/lista-pazienti */
router.get('/medico/lista-pazienti', isUserLogged, isStaffMember, asyncErrorHandler(getPazientiMedico));

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
