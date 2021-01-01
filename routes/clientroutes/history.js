var express = require('express') , router = express.Router() , history = require('../controllers/history') , dummy = require('../controllers/dummy');


router.get('/'																						,														history.historyAll);




router.get('/country/'																		,														history.historyCountryList);

router.get('/nation/'																			,														history.historyEthnicList);





router.get('/:history'																		,														history.historyDetail);


	


router.get('/nation/:ethnic'															,														history.historyEthnic);

router.get('/country/:country'														,														history.historyCountry);



//router.get('/:history/update'														,														history.historyUpdate);

//router.post('/:history/update'													,														history.historyUpdateSubmit);



//router.get('/:history/delete'														,														history.historyDelete);
	
//router.post('/:history/delete'													,														history.historyDeleteSubmit);



module.exports = router;