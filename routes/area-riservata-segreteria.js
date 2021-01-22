const express = require('express');
const router = express.Router();
const { asyncErrorHandler, isUserLogged } = require('../middleware');

/* GET index /area-riservata */
router.get('/', isUserLogged, (req,res,next)=>{
    res.send('AREA RISERVATA');
});

module.exports = router;