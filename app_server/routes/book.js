var express = require('express') , router = express.Router() , book = require('../controllers/book') , dummy = require('../controllers/dummy');


router.get('/'																					,														book.entryAll);



router.get('/country/'																	,														book.entryCountryList);

router.get('/nation/'																		,														book.entryEthnicList);



router.get('/:book'																			,														book.entryDetail);




router.get('/country/:country/'													,														book.entryCountry);

router.get('/nation/:ethnic/'														,														book.entryEthnic);



module.exports = router;