var express = require('express') , router = express.Router() , individual = require('../controllers/individual') , dummy = require('../../app_server/controllers/dummy');

router.get('/individual'																						,														individual.individuals);


router.get('/individual/okan/:individual'														,														individual.individualName);
	
router.post('/individual'																						,														individual.individualAddSubmit);



router.get('/individual/add'																				,														individual.individualAdd);

router.get('/individual/:individual/update'													,														individual.individualUpdate);
		



router.get('/individual/country/:country/'													,														individual.individualCountry);

router.get('/individual/ethnic/:ethnic/'														,														individual.individualEthnic);



router.get('/individual/:individual/'																,														individual.individualDetail);

router.put('/individual/:individual'																,														individual.individualUpdateSubmit);

router.delete('/individual/:individual'															,														individual.individualDelete);



//router.get('/individual/:ethnic/alphabet/'												,														individual.individualByAlphabet);
	

module.exports = router;