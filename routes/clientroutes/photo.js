var express = require('express') , router = express.Router() , photo = require('../controllers/photo') , dummy = require('../controllers/dummy');


router.get('/'																							,											photo.photoAll);


router.get('/country/'																			,											photo.photoCountryList);

router.get('/nation/'																				,											photo.photoEthnicList);



router.get('/:photo'																				,											photo.photoDetail);




router.get('/nation/:ethnic/'																,											photo.photoEthnic);

router.get('/country/:country/'															,											photo.photoCountry);



router.post('/:photo/vote'																	,											photo.photoVote);


//router.get('/:photo/update'																,														photo.photoUpdate);

//router.post('/:photo/update'															,														photo.photoUpdateSubmit);




//router.get('/:photo/delete'																,														photo.photoDelete);
	
//router.post('/:photo/delete'															,														photo.photoDeleteSubmit);


//router.get('/list' 																				,											photo.photos)

module.exports = router;