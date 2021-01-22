const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged } = require('../middleware');
const { getPrenotazioni } = require('../controllers/area-riservata-medico');

/* GET index /area-riservata */
router.get('/', isUserLogged, (req,res,next)=>{
    res.send('AREA RISERVATA');
});

/* GET index /area-riservata/medico/prenotazioni */
router.get('/medico/prenotazioni', asyncErrorHandler(getPrenotazioni));

module.exports = router;