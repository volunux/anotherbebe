var express = require('express') , router = express.Router() , book = require('../controllers/book') , dummy = require('../controllers/dummy');


router.get('/'																					,														book.bookAll);



router.get('/country/'																	,														book.bookCountryList);

router.get('/nation/'																		,														book.bookEthnicList);



router.get('/:book'																			,														book.bookDetail);




router.get('/country/:country/'													,														book.bookCountry);

router.get('/nation/:ethnic/'														,														book.bookEthnic);



//router.get('/:book/update'														,														book.bookUpdate);

//router.post('/:book/update'														,														book.bookUpdateSubmit);



//router.get('/:book/delete'														,														book.bookDelete);
	
//router.post('/:book/delete'														,														book.bookDeleteSubmit);



module.exports = router;