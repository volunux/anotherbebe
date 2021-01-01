var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../controllers/dummy') , book = require('../controllers/book') ,

dress = require('../controllers/dress') , festival = require('../controllers/festival') , folktale = require('../controllers/folktale') , food = require('../controllers/food') , law = require('../controllers/law') ,

history = require('../controllers/history') , history = require('../controllers/history') , individual = require('../controllers/individual') , legend = require('../controllers/legend') ,

life = require('../controllers/life') , mythology = require('../controllers/mythology') , name = require('../controllers/name') , photo = require('../controllers/photo') , 

proverb = require('../controllers/proverb') , religion = require('../controllers/religion') , video = require('../controllers/video') , remove = require('../controllers/delete'); 


router.get('/'																									,														remove.delete);
router.get('/art' 																							,														remove.art);
router.get('/book' 																							,														remove.book);
router.get('/dress' 																						,														remove.dress);
router.get('/festival' 																					,														remove.festival);
router.get('/folktale' 																					,														remove.folktale);
router.get('/food' 																							,														remove.food);
router.get('/history' 																					,														remove.history);
router.get('/individual' 																				,														remove.individual);
router.get('/law' 																							,														remove.law);
router.get('/legend' 																						,														remove.legend);
router.get('/life' 																							,														remove.life);
router.get('/mythology' 																				,														remove.mythology);
router.get('/name' 																							,														remove.name);
router.get('/photo' 																						,														remove.photo);
router.get('/proverb' 																					,														remove.proverb);
router.get('/religion' 																					,														remove.religion);
router.get('/sound' 																						,														remove.sound);
router.get('/video' 																						,														remove.video);


router.get('/art/:art'																					,															art.artDelete);

router.post('/art/:art'																					,															art.artDeleteSubmit);


router.get('/book/:book'																				,															book.bookDelete);

router.post('/book/:book'																				,															book.bookDeleteSubmit);


router.get('/dress/:dress'																			,															dress.dressDelete);

router.post('/dress/:dress'																			,															dress.dressDeleteSubmit);


router.get('/festival/:festival'																,															festival.festivalDelete);

router.post('/festival/:festival'																,															festival.festivalDeleteSubmit);


router.get('/folktale/:folktale'																,															folktale.folktaleDelete);

router.post('/folktale/:folktale'																,															folktale.folktaleDeleteSubmit);


router.get('/food/:food'																				,															food.foodDelete);

router.post('/food/:food'																				,															food.foodDeleteSubmit);


router.get('/history/:history'																	,															history.historyDelete);

router.post('/history/:history'																	,															history.historyDeleteSubmit);


router.get('/individual/:individual'														,															individual.individualDelete);

router.post('/individual/:individual'														,															individual.individualDeleteSubmit);


router.get('/law/:law'																					,															law.lawDelete);

router.post('/law/:law'																					,															law.lawDeleteSubmit);


router.get('/legend/:legend'																		,															legend.legendDelete);

router.post('/legend/:legend'																		,															legend.legendDeleteSubmit);


router.get('/life/:life'																				,															life.lifeDelete);

router.post('/life/:life'																				,															life.lifeDeleteSubmit);


router.get('/mythology/:mythology'															,															mythology.mythologyDelete);

router.post('/mythology/:mythology'															,															mythology.mythologyDeleteSubmit);


router.get('/name/nation/:ethnic/:name'													,															name.nameDelete);

router.post('/name/nation/:ethnic/:name/'												,															name.nameDeleteSubmit);



router.get('/name/animal/:ethnic/:name'													,															name.nameAnimalDelete);

router.post('/name/animal/:ethnic/:name/'												,															name.nameAnimalDeleteSubmit);



router.get('/name/plant/:ethnic/:name'													,															name.namePlantDelete);

router.post('/name/plant/:ethnic/:name/'												,															name.namePlantDeleteSubmit);



router.get('/proverb'																						,															proverb.proverbDelete);

router.post('/proverb'																					,															proverb.proverbDeleteSubmit);


router.get('/photo/:photo'																			,															photo.photoDelete);

router.post('/photo/:photo'																			,															photo.photoDeleteSubmit);


router.get('/religion/:religion'																,															religion.religionDelete);

router.post('/religion/:religion'																,															religion.religionDeleteSubmit);


router.get('/video/:video'																			,															video.videoDelete);

router.post('/video/:video'																			,															video.videoDeleteSubmit);


module.exports = router;