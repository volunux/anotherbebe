var router = require('express').Router() , photo = require('../controllers/photo');


router.get('/photo'																					,														photo.entryAll);	


router.get('/photo/ethnic/list/'														,														photo.entryEthnicList);

router.get('/photo/country/list/'														,														photo.entryCountryList);



router.get('/photo/ethnic/:ethnic/'													,														photo.entryEthnic);

router.get('/photo/country/:country/'												,														photo.entryCountry);

	

router.get('/photo/d/:photo/'																,														photo.entryDetail);


module.exports = router;