var express = require('express') , router = express.Router() , dummy = require('../controllers/dummy') , entry = require('../controllers/entries');


router.get('/'																									,														entry.entry);
router.get('/art' 																							,														entry.art);
router.get('/book' 																							,														entry.book);
router.get('/dress' 																						,														entry.dress);
router.get('/festival' 																					,														entry.festival);
router.get('/folktale' 																					,														entry.folktale);
router.get('/food' 																							,														entry.food);
router.get('/history' 																					,														entry.history);
router.get('/individual' 																				,														entry.individual);
router.get('/law' 																							,														entry.law);
router.get('/legend' 																						,														entry.legend);
router.get('/life' 																							,														entry.life);
router.get('/mythology' 																				,														entry.mythology);
router.get('/name' 																							,														entry.name);
router.get('/photo' 																						,														entry.photo);
router.get('/proverb' 																					,														entry.proverb);
router.get('/religion' 																					,														entry.religion);
router.get('/sound' 																						,														entry.sound);
router.get('/video' 																						,														entry.video);

module.exports = router;