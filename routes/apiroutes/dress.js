var express = require('express') , router = express.Router() , dress = require('../controllers/dress') , dummy = require('../../app_server/controllers/dummy');

router.get('/dress'																					,														dress.dress);

router.post('/dress'																				,														dress.dressAddSubmit);

	

router.get('/dress/add'																			,														dress.dressAdd);

router.get('/dress/okan/:dress'															,														dress.dressName);

router.get('/dress/update/:dress'														,														dress.dressUpdate);
		



router.get('/dress/country/:country/'												,														dress.dressCountry);

router.get('/dress/ethnic/:ethnic/'													,														dress.dressEthnic);




router.get('/dress/:dress/'																	,														dress.dressDetail);

router.put('/dress/:dress'																	,														dress.dressUpdateSubmit);

router.delete('/dress/:dress'																,														dress.dressDelete);



//router.get('/dress/:ethnic/alphabet/'											,														dress.dressByAlphabet);


module.exports = router;