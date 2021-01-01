var express = require('express') , router = express.Router() , festival = require('../controllers/festival') , dummy = require('../../app_server/controllers/dummy');

router.get('/festival'																				,														festival.festivals);

// router.post('/festival'																		,														festival.festivalAddSubmit);

	

// router.get('/festival/add'																	,														festival.festivalAdd);

router.get('/festival/okan/:festival'													,														festival.festivalName);

// router.get('/festival/update/:festival'										,														festival.festivalUpdate);
	



router.get('/festival/country/:country/'											,														festival.festivalCountry);

router.get('/festival/ethnic/:ethnic/'												,														festival.festivalEthnic);




router.get('/festival/d/:festival/'														,														festival.festivalDetail);

// router.put('/festival/:festival'														,														festival.festivalUpdateSubmit);

// router.delete('/festival/:festival'												,														festival.festivalDelete);



//router.get('/festival/:ethnic/alphabet/'										,														festival.festivalByAlphabet);


module.exports = router;