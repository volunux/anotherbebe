var express = require('express') , router = express.Router() , history = require('../controllers/history') , dummy = require('../../app_server/controllers/dummy');

router.get('/history'																					,														history.historys);

router.post('/history'																				,														history.historyAddSubmit);

	



router.get('/history/add'																			,														history.historyAdd);

router.get('/history/okan/:history'														,														history.historyName);

router.get('/history/:history/update'													,														history.historyUpdate);
		




router.get('/history/country/:country/'												,														history.historyCountry);

router.get('/history/ethnic/:ethnic/'													,														history.historyEthnic);



router.get('/history/:history/'																,														history.historyDetail);

router.put('/history/:history'																,														history.historyUpdateSubmit);

router.delete('/history/:history'															,														history.historyDelete);



//router.get('/history/:ethnic/alphabet/'											,														history.historyByAlphabet);


module.exports = router;