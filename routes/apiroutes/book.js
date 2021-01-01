var express = require('express') , router = express.Router() , book = require('../controllers/book') , dummy = require('../../app_server/controllers/dummy');

router.get('/book'																					,														book.books);

router.post('/book'																					,														book.bookAddSubmit);



router.get('/book/add'																			,														book.bookAdd);

router.get('/book/okan/:book'																,														book.bookName);

router.get('/book/update/:book'															,														book.bookUpdate);
		



router.get('/book/country/:country/'												,														book.bookCountry);

router.get('/book/ethnic/:ethnic/'													,														book.bookEthnic);




router.get('/book/:book/'																		,														book.bookDetail);

router.put('/book/:book'																		,														book.bookUpdateSubmit);

router.delete('/book/:book'																	,														book.bookDelete);
	


//router.get('/book/:ethnic/alphabet/'											,														book.bookByAlphabet);


module.exports = router;