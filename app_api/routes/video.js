var express = require('express') , router = express.Router() , video = require('../controllers/video') , dummy = require('../../app_server/controllers/dummy');

router.get('/video'																					,														video.videos);


router.get('/video/okan/:video'															,														video.videoName);
	
// router.post('/video'																			,														video.videoAddSubmit);



// router.get('/video/add'																		,														video.videoAdd);

// router.get('/video/:video/update'													,														video.videoUpdate);
	




router.get('/video/ethnic/:ethnic/'													,														video.videoEthnic);



router.get('/video/d/:video/'																,														video.videoDetail);

router.post('/video/:video/vote'														,														video.videoVote);

// router.put('/video/:video'																,														video.videoUpdateSubmit);
	
// router.delete('/video/:video'															,														video.videoDelete);



//router.get('/video/:ethnic/alphabet/'											,														videos.videosByAlphabet);


module.exports = router;