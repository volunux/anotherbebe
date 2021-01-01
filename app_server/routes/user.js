var express = require('express') , router = express.Router() , user = require('../controllers/user') , entry = require('../controllers/entries') , vAuth = require('../../app_api/config/verifyAuthentication');

router.get('/'																												,														user.user);
router.get('/dashboard'																								,														user.dashboard);

router.get('/profile'																									,														user.profile);
router.get('/profile/edit'																						,														user.profileUpdate);
router.post('/profile/edit'																						,														user.profileUpdateSubmit);
	
router.get('/entry'																										,														entry.entry);
router.get('/entry/art' 																							,														entry.art);
router.get('/entry/book' 																							,														entry.book);
router.get('/entry/dress' 																						,														entry.dress);
router.get('/entry/festival' 																					,														entry.festival);
router.get('/entry/folktale' 																					,														entry.folktale);
router.get('/entry/food' 																							,														entry.food);
router.get('/entry/history' 																					,														entry.history);
router.get('/entry/individual' 																				,														entry.individual);
router.get('/entry/law' 																							,														entry.law);
router.get('/entry/legend' 																						,														entry.legend);
router.get('/entry/life' 																							,														entry.life);
router.get('/entry/mythology' 																				,														entry.mythology);
router.get('/entry/name' 																							,														entry.name);
router.get('/entry/photo' 																						,														entry.photo);
router.get('/entry/proverb' 																					,														entry.proverb);
router.get('/entry/religion' 																					,														entry.religion);
router.get('/entry/sound' 																						,														entry.sound);
router.get('/entry/video' 																						,														entry.video);

module.exports = router;
