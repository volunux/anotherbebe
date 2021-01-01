var express = require('express') , router = express.Router() , legend = require('../controllers/legend') , dummy = require('../../app_server/controllers/dummy');

router.get('/legend'																				,														legend.entryAll);

// router.post('/legend'																		,														legend.legendAddSubmit);





// router.get('/legend/add'																	,														legend.legendAdd);

router.get('/legend/okan/:legend'														,														legend.entryDetail);

// router.get('/legend/update/:legend'											,														legend.legendUpdate);
	




router.get('/legend/country/:country/'											,														legend.entryCountry);

router.get('/legend/ethnic/:ethnic/'												,														legend.entryEthnic);



router.get('/legend/d/:legend/'															,														legend.entryDetail);

// router.put('/legend/:legend'															,														legend.legendUpdateSubmit);

// router.delete('/legend/:legend'													,														legend.legendDelete);



//router.get('/legend/:ethnic/alphabet/'										,														legend.legendByAlphabet);


module.exports = router;