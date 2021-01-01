var express = require('express') , router = express.Router() , sound = require('../controllers/sound') , dummy = require('../controllers/dummy');


router.get('/'																								,														sound.soundAll);




router.get('/country/'																				,														sound.soundCountryList);

router.get('/nation/'																					,														sound.soundEthnicList);




router.get('/:sound'																					,														sound.soundDetail);


router.get('/nation/:ethnic/'																	,														sound.soundEthnic);

router.get('/country/:country/'																,														sound.soundCountry);



//router.get('/:sound/update'																	,														sound.soundUpdate);

//router.post('/:sound/update'																,														sound.soundUpdateSubmit);



//router.get('/:sound/delete'																	,														sound.soundDelete);
	
//router.post('/:sound/delete'																,														sound.soundDeleteSubmit);



module.exports = router;