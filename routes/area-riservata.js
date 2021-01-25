const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged, isStaffMember } = require('../middleware');
const { indexAreaRiservata, getPrenotazioniMedico, getPazientiMedico, getPrenotazioniSegreteria, newPrenotazioneSegreteria, createPrenotazioneSegreteria, getPazientiSegreteria, getIndicazioniSegreteria } = require('../controllers/area-riservata');

/* GET index /area-riservata */
router.get('/', isUserLogged, isStaffMember, indexAreaRiservata);

/* GET  /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', isUserLogged, isStaffMember, asyncErrorHandler(getPrenotazioniMedico));

/* GET  /area-riservata/medico/lista-pazienti */
router.get('/medico/lista-pazienti', isUserLogged, isStaffMember, asyncErrorHandler(getPazientiMedico));

/* GET  /area-riservata/segreteria/prenotazioni */
router.get('/segreteria/prenotazioni', isUserLogged, isStaffMember, asyncErrorHandler(getPrenotazioniSegreteria));

/* GET  /area-riservata/segreteria/nuova-prenotazione */
router.get('/segreteria/nuova-prenotazione', isUserLogged, isStaffMember, asyncErrorHandler(newPrenotazioneSegreteria));

/* POST  /area-riservata/segreteria/nuova-prenotazione */
router.post('/segreteria/nuova-prenotazione', isUserLogged, isStaffMember, asyncErrorHandler(createPrenotazioneSegreteria));

/* GET  /area-riservata/segreteria/pazienti */
router.get('/segreteria/pazienti', isUserLogged, isStaffMember, asyncErrorHandler(getPazientiSegreteria));

/* GET  /area-riservata/segreteria/indicazioni-arrivo */
router.get('/segreteria/indicazioni-arrivo', isUserLogged, isStaffMember, asyncErrorHandler(getIndicazioniSegreteria));










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
