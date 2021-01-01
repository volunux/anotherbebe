var express = require('express') , router = express.Router() , art = require('../controllers/article')('Art' , 'art');


router.get('/'																							,														art.entryAll);



router.get('/country/'																			,														art.entryCountryList);

router.get('/nation/'																				,														art.entryEthnicList);




router.get('/:article'																			,														art.entryDetail);




router.get('/country/:country/'															,														art.entryCountry);
	
router.get('/nation/:ethnic/'																,														art.entryEthnic);


module.exports = router;