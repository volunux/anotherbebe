var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../controllers/dummy') , book = require('../controllers/book') ,

dress = require('../controllers/dress') , festival = require('../controllers/festival') , folktale = require('../controllers/folktale') , food = require('../controllers/food') , law = require('../controllers/law') ,

history = require('../controllers/history') , history = require('../controllers/history') , individual = require('../controllers/individual') , legend = require('../controllers/legend') ,

life = require('../controllers/life') , mythology = require('../controllers/mythology') , name = require('../controllers/name') , photo = require('../controllers/photo') , 

proverb = require('../controllers/proverb') , religion = require('../controllers/religion') , video = require('../controllers/video') , update = require('../controllers/update');


router.get('/'																									,														update.update);


router.get('/art' 																							,														update.art);
router.get('/book' 																							,														update.book);
router.get('/dress' 																						,														update.dress);
router.get('/festival' 																					,														update.festival);
router.get('/folktale' 																					,														update.folktale);
router.get('/food' 																							,														update.food);
router.get('/history' 																					,														update.history);
router.get('/individual' 																				,														update.individual);
router.get('/law' 																							,														update.law);
router.get('/legend' 																						,														update.legend);
router.get('/life' 																							,														update.life);
router.get('/mythology' 																				,														update.mythology);
router.get('/name' 																							,														update.name);
router.get('/photo' 																						,														update.photo);
router.get('/proverb' 																					,														update.proverb);
router.get('/religion' 																					,														update.religion);
router.get('/sound' 																						,														update.sound);
router.get('/video' 																						,														update.video);



router.get('/art/:art'																					,															art.artUpdate);

router.post('/art/:art'																					,															art.artUpdateSubmit);


router.get('/book/:book'																				,															book.bookUpdate);

router.post('/book/:book'																				,															book.bookUpdateSubmit);


router.get('/dress/:dress'																			,															dress.dressUpdate);

router.post('/dress/:dress'																			,															dress.dressUpdateSubmit);


router.get('/festival/:festival'																,															festival.festivalUpdate);

router.post('/festival/:festival'																,															festival.festivalUpdateSubmit);


router.get('/folktale/:folktale'																,															folktale.folktaleUpdate);

router.post('/folktale/:folktale'																,															folktale.folktaleUpdateSubmit);


router.get('/food/:food'																				,															food.foodUpdate);

router.post('/food/:food'																				,															food.foodUpdateSubmit);


router.get('/history/:history'																	,															history.historyUpdate);

router.post('/history/:history'																	,															history.historyUpdateSubmit);



router.get('/individual/:individual'														,															individual.individualUpdate);

router.post('/individual/:individual'														,															individual.individualUpdateSubmit);


router.get('/law/:law'																					,															law.lawUpdate);

router.post('/law/:law'																					,															law.lawUpdateSubmit);


router.get('/legend/:legend'																		,															legend.legendUpdate);

router.post('/legend/:legend'																		,															legend.legendUpdateSubmit);


router.get('/life/:life'																				,															life.lifeUpdate);

router.post('/life/:life'																				,															life.lifeUpdateSubmit);


router.get('/mythology/:mythology'															,															mythology.mythologyUpdate);

router.post('/mythology/:mythology'															,															mythology.mythologyUpdateSubmit);


router.get('/name/nation/:ethnic/:name/'												,															name.nameUpdate);

router.post('/name/nation/:ethnic/:name/'												,															name.nameUpdateSubmit);



router.get('/name/animal/:ethnic/:name/'												,															name.nameUpdate);

router.post('/name/animal/:ethnic/:name/'												,															name.nameUpdateSubmit);



router.get('/name/plant/:ethnic/:name/'													,															name.nameUpdate);

router.post('/name/plant/:ethnic/:name/'												,															name.nameUpdateSubmit);


router.get('/proverb'																						,															proverb.proverbUpdate);

router.post('/proverb'																					,															proverb.proverbUpdateSubmit);


router.get('/photo/:photo'																			,															photo.photoUpdate);

router.post('/photo/:photo'																			,															photo.photoUpdateSubmit);


router.get('/religion/:religion'																,															religion.religionUpdate);

router.post('/religion/:religion'																,															religion.religionUpdateSubmit);


router.get('/video/:video'																			,															video.videoUpdate);

router.post('/video/:video'																			,															video.videoUpdateSubmit);


module.exports = router;