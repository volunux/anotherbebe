var express = require('express') , router = express.Router() , video = require('../controllers/video') , dummy = require('../controllers/dummy');


router.get('/'																								,														video.videoAll);




router.get('/country/'																				,														video.videoCountryList);

router.get('/nation/'																					,														video.videoEthnicList);




router.get('/:video'																					,														video.videoDetail);


router.get('/nation/:ethnic/'																	,														video.videoEthnic);

router.get('/country/:country/'																,														video.videoCountry);



//router.get('/:video/update'																	,														video.videoUpdate);

//router.post('/:video/update'																,														video.videoUpdateSubmit);



//router.get('/:video/delete'																	,														video.videoDelete);
	
//router.post('/:video/delete'																,														video.videoDeleteSubmit);



module.exports = router;