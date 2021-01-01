var express = require('express') , router = express.Router() , festival = require('../controllers/festival') , dummy = require('../controllers/dummy');


router.get('/'																							,														festival.festivalAll);





router.get('/country/'																			,														festival.festivalCountryList);

router.get('/nation/'																				,														festival.festivalEthnicList);




router.get('/:festival'																			,														festival.festivalDetail);



router.get('/nation/:ethnic'																,														festival.festivalEthnic);

router.get('/country/:country/'															,														festival.festivalCountry);



//router.get('/:festival/update'														,														festival.festivalUpdate);

//router.post('/:festival/update'														,														festival.festivalUpdateSubmit);



//router.get('/:festival/delete'														,														festival.festivalDelete);
	
//router.post('/:festival/delete'														,														festival.festivalDeleteSubmit);



module.exports = router;