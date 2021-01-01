var express = require('express') , router = express.Router() , folktale = require('../controllers/folktale');


router.get('/'																										,											folktale.folktaleAll);





router.get('/country/'																						,											folktale.folktaleCountryList);

router.get('/nation/'																							,											folktale.folktaleEthnicList);



router.get('/:folktale'																						,											folktale.folktaleDetail);





router.get('/nation/:ethnic/'																			,											folktale.folktaleEthnic);

router.get('/country/:country/'																		,											folktale.folktaleCountry);



//router.get('/:folktale/update'																,												folktale.folktaleUpdate);

//router.post('/:folktale/update'																,												folktale.folktaleUpdateSubmit);



//router.get('/:folktale/delete'																,												folktale.folktaleDelete);

//router.post('/:folktale/delete'																,												folktale.folktaleDeleteSubmit);



module.exports = router;