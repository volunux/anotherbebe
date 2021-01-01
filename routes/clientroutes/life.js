var express = require('express') , router = express.Router() , life = require('../controllers/life') , dummy = require('../controllers/dummy');


router.get('/'																						,														life.lifeAll);


router.get('/country/'																		,														life.lifeCountryList);

router.get('/nation/'																			,														life.lifeEthnicList);



router.get('/:life'																				,														life.lifeDetail);



router.get('/nation/:ethnic/'															,														life.lifeEthnic);

router.get('/country/:country'														,														life.lifeCountry);



//router.get('/:life/update'																,														life.lifeUpdate);

//router.post('/:life/update'																,														life.lifeUpdateSubmit);



//router.get('/:life/delete'																,														life.lifeDelete);
	
//router.post('/:life/delete'																,														life.lifeDeleteSubmit);



module.exports = router;