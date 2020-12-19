const express = require('express');
const router = express.Router();
const { postLink, getLink } = require('../controllers'); // /index è sottinteso
const { asyncErrorHandler } = require('../middleware'); // /index è sottinteso

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Home Page' });
});

/* GET /linkUtili */
router.get('/link-utili', asyncErrorHandler(getLink));
router.post('/link-utili', asyncErrorHandler(postLink));

module.exports = router;
