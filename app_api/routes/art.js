var router = require('express').Router();

const artCtrl = require('../controllers/article')('Art' , 'Art');


router.get('/art'																				,														artCtrl.entryAll);




router.get('/art/ethnic/list/'													,														artCtrl.entryEthnicList);

router.get('/art/country/list/'													,														artCtrl.entryCountryList);




router.get('/art/country/:country/'											,														artCtrl.entryCountry);

router.get('/art/ethnic/:ethnic/'												,														artCtrl.entryEthnic);





router.get('/art/d/:article/'														,														artCtrl.entryDetail);




module.exports = router;