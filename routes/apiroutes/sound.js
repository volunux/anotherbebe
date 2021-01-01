var express = require('express') , router = express.Router() , sound = require('../controllers/sound') , dummy = require('../../app_server/controllers/dummy');

router.get('/sound'																					,														sound.sounds);


router.get('/sound/okan/:sound'															,														sound.soundName);
	
router.post('/sound'																				,														sound.soundAddSubmit);



router.get('/sound/add'																			,														sound.soundAdd);

router.get('/sound/:sound/update'														,														sound.soundUpdate);
	




router.get('/sound/ethnic/:ethnic/'													,														sound.soundEthnic);



router.get('/sound/:sound/'																	,														sound.soundDetail);

router.post('/sound/:sound/vote'														,														sound.soundVote);

router.put('/sound/:sound'																	,														sound.soundUpdateSubmit);
	
router.delete('/sound/:sound'																,														sound.soundDelete);



//router.get('/sound/:ethnic/alphabet/'											,														sounds.soundsByAlphabet);


module.exports = router;