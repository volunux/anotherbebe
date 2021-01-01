var express = require('express') , router = express.Router() , legend = require('../controllers/legend');


router.get('/'																							,														legend.entryAll);


router.get('/country/'																			,														legend.entryCountryList);

router.get('/nation/'																				,														legend.entryEthnicList);



router.get('/:legend'																				,														legend.entryDetail);


router.get('/nation/:ethnic'																,														legend.entryEthnic);

router.get('/country/:country'															,														legend.entryCountry);

//router.get('/:legend/update'															,														legend.legendUpdate);

//router.post('/:legend/update'															,														legend.legendUpdateSubmit);



//router.get('/:legend/delete'															,														legend.legendDelete);

//router.post('/:legend/delete'															,														legend.legendDeleteSubmit);



module.exports = router;