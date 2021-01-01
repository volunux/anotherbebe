var express = require('express') , router = express.Router()  , video = require('../controllers/video') , dummy = require('../controllers/dummy'); 


router.get('/:ethnic/videos/'																		,											video.videoEthnic);

router.post('/:ethnic/videos/:video/vote'												,															video.videoVote);

/*
router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/art'																,											dummy.dummy);

router.get('/:ethnic/videos/genre/article'											,											dummy.dummy);

router.get('/:ethnic/videos/genre/author'												,											dummy.dummy);

router.get('/:ethnic/videos/genre/dress'												,											dummy.dummy);

router.get('/:ethnic/videos/genre/festival'											,											dummy.dummy);

router.get('/:ethnic/videos/genre/folktale'											,											dummy.dummy);

router.get('/:ethnic/videos/genre/food'													,											dummy.dummy);

router.get('/:ethnic/videos/genre/'															,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);

router.get('/:ethnic/videos/century'														,											dummy.dummy);


*/

router.get('/:ethnic/videos/:video'															,											video.videoDetail);


//router.get('/:ethnic/video/plant/alphabet/'										,											video.videoPlant);

//router.get('/:ethnic/video/:video'															, 										video.videoDetail);



//router.get('/:ethnic/video/gender/:gender/'										,											video.videoGender);

//router.get('/:ethnic/video/alphabet/:alphabet/'								, 										video.videoByAlphabet);

//router.get('/:ethnic/video/animal/alphabet/:alphabet/'				, 										video.videoOfAnimalByAlphabet);

//router.get('/:ethnic/video/plant/alphabet/:alphabet/'					, 										video.videoOfPlantByAlphabet);



module.exports = router;