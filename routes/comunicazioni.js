const express = require('express');
const router = express.Router();

/* GET index /comunicazioni */
router.get('/', (req, res, next) => {
	res.send('GET /comunicazioni');
});

/* GET new /comunicazioni/new */
router.get('/new', (req, res, next) => {
	res.send('GET /comunicazioni/new');
});

/* POST create /comunicazioni */
router.post('/', (req, res, next) => {
	res.send('CREATE /comunicazioni');
});

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
