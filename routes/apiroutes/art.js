var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../../app_server/controllers/dummy');

router.get('/art'																				,														art.arts);
	
router.post('/art'																			,														art.artAddSubmit);



router.get('/art/add'																		,														art.artAdd);

router.get('/art/okan/:art'															,														art.artName);

router.get('/art/update/:art'														,														art.artUpdate);
	



router.get('/art/country/:country/'											,														art.artCountry);

router.get('/art/ethnic/:ethnic/'												,														art.artEthnic);





router.get('/art/:art/'																	,														art.artDetail);

router.put('/art/:art'																	,														art.artUpdateSubmit);
	
router.delete('/art/:art'																,														art.artDelete);




//router.get('/art/:ethnic/:art/'													,														art.artDetailDet);

//router.get('/art/:ethnic/alphabet/'										,														arts.artsByAlphabet);


module.exports = router;