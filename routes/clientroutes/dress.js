var express = require('express') , router = express.Router() , dress = require('../controllers/dress') , dummy = require('../controllers/dummy');


router.get('/'																					,														dress.dressAll);



router.get('/country/'																	,														dress.dressCountryList);

router.get('/nation/'																		,														dress.dressEthnicList);



router.get('/:dress'																		,														dress.dressDetail);



router.get('/nation/:ethnic'														,														dress.dressEthnic);

router.get('/country/:country/'													,														dress.dressCountry);




//router.get('/:dress/update'														,														dress.dressUpdate);

//router.post('/:dress/update'													,														dress.dressUpdateSubmit);



//router.get('/:dress/delete'														,														dress.dressDelete);
	
//router.post('/:dress/delete'													,														dress.dressDeleteSubmit);



module.exports = router;