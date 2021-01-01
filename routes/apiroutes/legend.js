var express = require('express') , router = express.Router() , legend = require('../controllers/legend') , dummy = require('../../app_server/controllers/dummy');

router.get('/legend'																				,														legend.legends);

router.post('/legend'																				,														legend.legendAddSubmit);





router.get('/legend/add'																		,														legend.legendAdd);

router.get('/legend/okan/:legend'														,														legend.legendName);

router.get('/legend/update/:legend'													,														legend.legendUpdate);
	




router.get('/legend/country/:country/'											,														legend.legendCountry);

router.get('/legend/ethnic/:ethnic/'												,														legend.legendEthnic);



router.get('/legend/:legend/'																,														legend.legendDetail);

router.put('/legend/:legend'																,														legend.legendUpdateSubmit);

router.delete('/legend/:legend'															,														legend.legendDelete);



//router.get('/legend/:ethnic/alphabet/'										,														legend.legendByAlphabet);


module.exports = router;