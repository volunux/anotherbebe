var express = require('express') , router = express.Router() , legend = require('../controllers/legend') , dummy = require('../controllers/dummy');


router.get('/'																							,														legend.legendAll);


router.get('/country/'																			,														legend.legendCountryList);

router.get('/nation/'																				,														legend.legendEthnicList);



router.get('/:legend'																				,														legend.legendDetail);


router.get('/nation/:ethnic'																,														legend.legendEthnic);

router.get('/country/:country'															,														legend.legendCountry);

//router.get('/:legend/update'															,														legend.legendUpdate);

//router.post('/:legend/update'															,														legend.legendUpdateSubmit);



//router.get('/:legend/delete'															,														legend.legendDelete);

//router.post('/:legend/delete'															,														legend.legendDeleteSubmit);



module.exports = router;