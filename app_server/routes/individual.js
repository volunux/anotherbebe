var express = require('express') , router = express.Router() , individual = require('../controllers/individual') , dummy = require('../controllers/dummy');


router.get('/'																								,														individual.individualAll);

router.get('/country/'																				,														individual.individualCountryList);

router.get('/nation/'																					,														individual.individualEthnicList);


router.get('/:individual'																			,														individual.individualDetail);


router.get('/nation/:ethnic/'																	,														individual.individualEthnic);

router.get('/country/:country'																,														individual.individualCountry);



//router.get('/:individual/update'														,														individual.individualUpdate);

//router.post('/:individual/update'														,														individual.individualUpdateSubmit);



//router.get('/:individual/delete'														,														individual.individualDelete);
	
//router.post('/:individual/delete'														,														individual.individualDeleteSubmit);



module.exports = router;