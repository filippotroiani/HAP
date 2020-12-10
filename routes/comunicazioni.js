const express = require('express');
const router = express.Router();
const {
	getComunicazioni,
	createComunicazione
} = require('../controllers/comunicazioni');
const { errorHandler } = require('../middleware');

/* GET index /comunicazioni */
router.get('/', errorHandler(getComunicazioni));

/* GET new /comunicazioni/new */
router.get('/new', (req, res, next) => {
	res.send('GET /comunicazioni/new');
});

/* POST create /comunicazioni */
router.post('/', errorHandler(createComunicazione));

/* GET show /comunicazioni/:id_comunicazione */
router.get('/:id_comunicazione', (req, res, next) => {
	res.send('SHOW /comunicazioni/:id_comunicazione');
});

/* GET edit /comunicazioni/:id_comunicazione */
router.get('/:id_comunicazione/edit', (req, res, next) => {
	res.send('EDIT /comunicazioni/:id_comunicazione/edit');
});

/* PUT update /comunicazioni/:id_comunicazione */
router.put('/:id_comunicazione', (req, res, next) => {
	res.send('EDIT /comunicazioni/:id_comunicazione');
});

/* DELETE destroy /comunicazioni/:id_comunicazione */
router.delete('/:id_comunicazione', (req, res, next) => {
	res.send('DELETE /comunicazioni');
});

module.exports = router;
