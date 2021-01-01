var express = require('express') , router = express.Router() , mythology = require('../controllers/mythology') , dummy = require('../controllers/dummy');


router.get('/'																							,														mythology.mythologyAll);


router.get('/country/'																			,														mythology.mythologyCountryList);

router.get('/nation/'																				,														mythology.mythologyEthnicList);



router.get('/:mythology'																		,														mythology.mythologyDetail);


router.get('/nation/:ethnic'																,														mythology.mythologyEthnic);

router.get('/country/:country'															,														mythology.mythologyCountry);



//router.get('/:mythology/update'														,														mythology.mythologyUpdate);

//router.post('/:mythology/update'													,														mythology.mythologyUpdateSubmit);



//router.get('/:mythology/delete'														,														mythology.mythologyDelete);
	
//router.post('/:mythology/delete'													,														mythology.mythologyDeleteSubmit);



module.exports = router;