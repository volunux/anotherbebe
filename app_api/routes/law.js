var express = require('express') , router = express.Router() , law = require('../controllers/law') , dummy = require('../../app_server/controllers/dummy');

router.get('/law'																				,														law.laws);

// router.post('/law'																		,														law.lawAddSubmit);

	



// router.get('/law/add'																,														law.lawAdd);

router.get('/law/okan/:law'															,														law.lawName);

// router.get('/law/update/:law'												,														law.lawUpdate);
		




router.get('/law/country/:country/'											,														law.lawCountry);

router.get('/law/ethnic/:ethnic/'												,														law.lawEthnic);



router.get('/law/d/:law/'																,														law.lawDetail);

// router.put('/law/:law'																,														law.lawUpdateSubmit);

// router.delete('/law/:law'														,														law.lawDelete);



//router.get('/law/:ethnic/alphabet/'										,														law.lawByAlphabet);


module.exports = router;