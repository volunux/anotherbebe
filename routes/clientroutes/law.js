var express = require('express') , router = express.Router() , law = require('../controllers/law') , dummy = require('../controllers/dummy');


router.get('/'																				,														law.lawAll);



router.get('/country/'																,														law.lawCountryList);

router.get('/nation/'																	,														law.lawEthnicList);


router.get('/:law'																		,														law.lawDetail);


router.get('/nation/:ethnic'													,														law.lawEthnic);

router.get('/country/:country'												,														law.lawCountry);


//router.get('/:law/update'														,														law.lawUpdate);

//router.post('/:law/update'													,														law.lawUpdateSubmit);



//router.get('/:law/delete'														,														law.lawDelete);
	
//router.post('/:law/delete'													,														law.lawDeleteSubmit);



module.exports = router;