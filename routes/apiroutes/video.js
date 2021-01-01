var express = require('express') , router = express.Router() , video = require('../controllers/video') , dummy = require('../../app_server/controllers/dummy');

router.get('/motion'																					,														video.videos);


router.get('/motion/okan/:video'															,														video.videoName);
	
router.post('/motion'																					,														video.videoAddSubmit);



router.get('/motion/add'																			,														video.videoAdd);

router.get('/motion/:video/update'														,														video.videoUpdate);
	




router.get('/motion/ethnic/:ethnic/'													,														video.videoEthnic);



router.get('/motion/:video/'																	,														video.videoDetail);

router.post('/motion/:video/vote'															,														video.videoVote);

router.put('/motion/:video'																		,														video.videoUpdateSubmit);
	
router.delete('/motion/:video'																,														video.videoDelete);



//router.get('/motion/:ethnic/alphabet/'											,														videos.videosByAlphabet);


module.exports = router;