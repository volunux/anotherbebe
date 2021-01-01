var express = require('express') , router = express.Router() , religion = require('../controllers/religion') , dummy = require('../controllers/dummy');


router.get('/'																						,														religion.religionAll);


router.get('/country/'																		,														religion.religionCountryList);

router.get('/nation/'																			,														religion.religionEthnicList);


router.get('/:religion'																		,														religion.religionDetail);


router.get('/nation/:ethnic/'															,														religion.religionEthnic);

router.get('/country/:country'														,														religion.religionCountry);



//router.get('/:religion/update'													,														religion.religionUpdate);

//router.post('/:religion/update'													,														religion.religionUpdateSubmit);



//router.get('/:religion/delete'													,														religion.religionDelete);
	
//router.post('/:religion/delete'													,														religion.religionDeleteSubmit);



module.exports = router;