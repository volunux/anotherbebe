var express = require('express') , router = express.Router() , mythology = require('../controllers/mythology') , dummy = require('../../app_server/controllers/dummy');

router.get('/mythology'																							,														mythology.mythologys);

router.post('/mythology'																						,														mythology.mythologyAddSubmit);


	

router.get('/mythology/add'																					,														mythology.mythologyAdd);

router.get('/mythology/okan/:mythology'															,														mythology.mythologyName);

router.get('/mythology/:mythology/update'														,														mythology.mythologyUpdate);
		

		


router.get('/mythology/country/:country/'														,														mythology.mythologyCountry);

router.get('/mythology/ethnic/:ethnic/'															,														mythology.mythologyEthnic);



router.get('/mythology/:mythology/'																	,														mythology.mythologyDetail);

router.put('/mythology/:mythology'																	,														mythology.mythologyUpdateSubmit);

router.delete('/mythology/:mythology'																,														mythology.mythologyDelete);



//router.get('/mythology/:ethnic/alphabet/'													,														mythology.mythologyByAlphabet);


module.exports = router;