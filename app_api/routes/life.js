var express = require('express') , router = express.Router() , life = require('../controllers/life') , dummy = require('../../app_server/controllers/dummy');

router.get('/life'																				,														life.lifes);
	
// router.post('/life'																		,														life.lifeAddSubmit);



// router.get('/life/add'																	,														life.lifeAdd);

router.get('/life/okan/:life'															,														life.lifeName);

// router.get('/life/update/:life'												,														life.lifeUpdate);
	




router.get('/life/country/:country/'											,														life.lifeCountry);

router.get('/life/ethnic/:ethnic/'												,														life.lifeEthnic);



router.get('/life/d/:life/'																,														life.lifeDetail);

// router.put('/life/:life'																,														life.lifeUpdateSubmit);
	
// router.delete('/life/:life'														,														life.lifeDelete);



//router.get('/life/:ethnic/alphabet/'										,														life.lifeByAlphabet);


module.exports = router;