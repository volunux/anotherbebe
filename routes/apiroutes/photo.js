var express = require('express') , router = express.Router() , photo = require('../controllers/photo') , dummy = require('../../app_server/controllers/dummy');

router.get('/image'																					,														photo.photoAll);

router.post('/image'																				,														photo.photoAddSubmit);







router.get('/image/add'																			,														photo.photoAdd);

router.get('/image/update/:photo'														,														photo.photoUpdate);
	


router.get('/image/ethnic/:ethnic/'													,														photo.photoEthnic);

router.get('/image/country/:country/'												,														photo.photoCountry);





router.get('/image/:photo/'																	,														photo.photoDetail);



router.post('/image/:photo/vote'														,														photo.photoVote);

router.put('/image/:photo'																	,														photo.photoUpdateSubmit);
	
router.delete('/image/:photo'																,														photo.photoDelete);



//router.get('/image/:ethnic/alphabet/'											,														photos.photosByAlphabet);


module.exports = router;