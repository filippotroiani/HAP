const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged, isStaffMember } = require('../middleware');
const { indexAreaRiservata, getPrenotazioniMedico, getPazientiMedico, getPrenotazioniSegreteria } = require('../controllers/area-riservata');

/* GET index /area-riservata */
router.get('/', isUserLogged, isStaffMember, indexAreaRiservata);

/* GET  /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', isUserLogged, isStaffMember, asyncErrorHandler(getPrenotazioniMedico));

/* GET  /area-riservata/medico/lista-pazienti */
router.get('/medico/lista-pazienti', isUserLogged, isStaffMember, asyncErrorHandler(getPazientiMedico));

/* GET  /area-riservata/medico/lista-pazienti */
router.get('/segreteria/prenotazioni', isUserLogged, isStaffMember, asyncErrorHandler(getPrenotazioniSegreteria));









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
