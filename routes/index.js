const express = require('express');
const router = express.Router();
const { postLink, getLink, getHomePage } = require('../controllers'); // /index è sottinteso
const { asyncErrorHandler } = require('../middleware'); // /index è sottinteso

/* GET home page. */
router.get('/', getHomePage);

/* GET /linkUtili */
router.get('/link-utili', asyncErrorHandler(getLink));
router.post('/link-utili', asyncErrorHandler(postLink));

module.exports = router;
