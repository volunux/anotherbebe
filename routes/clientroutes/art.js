var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../controllers/dummy');


router.get('/'																							,														art.artAll);



router.get('/country/'																			,														art.artCountryList);

router.get('/nation/'																				,														art.artEthnicList);



router.get('/:art'																					,														art.artDetail);


router.get('/country/:country/'															,														art.artCountry);
	
router.get('/nation/:ethnic/'																,														art.artEthnic);


//router.get('/:art/update'																	,														art.artUpdate);

//router.post('/:art/update'																,														art.artUpdateSubmit);



//router.get('/:art/delete'																	,														art.artDelete);
	
//router.post('/:art/delete'																,														art.artDeleteSubmit);



//router.get('/nation/:ethnic/:art'													,														art.artEthnicDet);


module.exports = router;