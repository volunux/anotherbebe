var express = require('express') , router = express.Router() , religion = require('../controllers/religion') , dummy = require('../../app_server/controllers/dummy');

router.get('/religion'																						,														religion.religions);

// router.post('/religion'																				,														religion.religionAddSubmit);



// router.get('/religion/add'																			,														religion.religionAdd);

router.get('/religion/okan/:religion'															,														religion.religionName);

// router.get('/religion/update/:religion'												,														religion.religionUpdate);
		


router.get('/religion/country/:country/'													,														religion.religionCountry);

router.get('/religion/ethnic/:ethnic/'														,														religion.religionEthnic);



router.get('/religion/d/:religion/'																,														religion.religionDetail);

// router.put('/religion/:religion'																,														religion.religionUpdateSubmit);

// router.delete('/religion/:religion'														,														religion.religionDelete);



//router.get('/religion/:ethnic/alphabet/'												,														religion.religionByAlphabet);


module.exports = router;