var express = require('express') , router = express.Router() , photo = require('../controllers/photo');


router.get('/'																							,											photo.entryAll);


router.get('/nation/'																				,											photo.entryEthnicList);

router.get('/country/'																			,											photo.entryCountryList);
	



router.get('/:photo'																				,											photo.entryDetail);




router.get('/nation/:ethnic/'																,											photo.entryEthnic);

router.get('/country/:country/'															,											photo.entryCountry);



module.exports = router;