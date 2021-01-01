var router = require('express').Router() , book = require('../controllers/book');

router.get('/book'																					,														book.entryAll);



router.get('/book/okan/:book'																,														book.entryDetail);		



router.get('/book/country/:country/'												,														book.entryCountry);

router.get('/book/ethnic/:ethnic/'													,														book.entryEthnic);



router.get('/book/d/:book/'																	,														book.entryDetail);


module.exports = router;