var express = require('express') , router = express.Router()  , book = require('../controllers/book') , dummy = require('../controllers/dummy'); 


//router.get('/:ethnic/book/'																						,											book.bookEthnic);

//router.get('/:ethnic/book/:book'																			,											book.bookDetail);

//router.get('/:ethnic/book/plant/alphabet/'													,											book.bookPlant);

//router.get('/:ethnic/book/:book'																		, 										book.bookDetail);



//router.get('/:ethnic/book/gender/:gender/'													,											book.bookGender);

//router.get('/:ethnic/book/alphabet/:alphabet/'											, 										book.bookByAlphabet);

//router.get('/:ethnic/book/animal/alphabet/:alphabet/'							, 										book.bookOfAnimalByAlphabet);

//router.get('/:ethnic/book/plant/alphabet/:alphabet/'								, 										book.bookOfPlantByAlphabet);



module.exports = router;