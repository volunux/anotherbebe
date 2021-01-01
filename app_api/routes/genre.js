var router = require('express').Router() , genre = require('../controllers/genre');



router.get('/genre'																					,										genre.genreList);

router.get('/genre/name/:genre'															,										genre.genreName);

router.post('/genre'																				,										genre.genreAdd);	



router.get('/genre/d/:genre'																,										genre.genreDetail);

router.put('/genre/:genre'																	,										genre.genreUpdate);

router.delete('/genre/:genre'																,										genre.genreDelete);




module.exports = router;