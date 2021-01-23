const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged, isStaffMember } = require('../middleware');
const { indexAreaRiservata, getPrenotazioni } = require('../controllers/area-riservata');

/* GET index /area-riservata */
router.get('/', isUserLogged, isStaffMember, indexAreaRiservata);

/* GET index /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', asyncErrorHandler(getPrenotazioni));

module.exports = router;