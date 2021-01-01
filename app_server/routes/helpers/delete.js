var express = require('express') , router = express.Router() , book = require('../../controllers/book') ,

dress = require('../../controllers/dress') , festival = require('../../controllers/festival') , folktale = require('../../controllers/folktale') , food = require('../../controllers/food') , 

law = require('../../controllers/law') , history = require('../../controllers/history') , history = require('../../controllers/history') , individual = require('../../controllers/individual') , 

life = require('../../controllers/life') , mythology = require('../../controllers/mythology') , name = require('../../controllers/name') , 

photo = require('../../controllers/photo') , sound = require('../../controllers/sound') , proverb = require('../../controllers/proverb') , religion = require('../../controllers/religion') , 

video = require('../../controllers/video') , removeCtrl = require('../../controllers/delete');

const artCtrl = require('../../controllers/article')('Art' , 'art');

const legendCtrl = require('../../controllers/legend');


router.get('/'																									,														removeCtrl.delete);
router.get('/art' 																							,														removeCtrl.art);
router.get('/book' 																							,														removeCtrl.book);
router.get('/dress' 																						,														removeCtrl.dress);
router.get('/festival' 																					,														removeCtrl.festival);
router.get('/folktale' 																					,														removeCtrl.folktale);
router.get('/food' 																							,														removeCtrl.food);
router.get('/history' 																					,														removeCtrl.history);
router.get('/individual' 																				,														removeCtrl.individual);
router.get('/law' 																							,														removeCtrl.law);
router.get('/legend' 																						,														removeCtrl.legend);
router.get('/life' 																							,														removeCtrl.life);
router.get('/mythology' 																				,														removeCtrl.mythology);
router.get('/name' 																							,														removeCtrl.name);
router.get('/photo' 																						,														removeCtrl.photo);
router.get('/proverb' 																					,														removeCtrl.proverb);
router.get('/religion' 																					,														removeCtrl.religion);
router.get('/sound' 																						,														removeCtrl.sound);
router.get('/video' 																						,														removeCtrl.video);


router.get('/art/:article'																			,															artCtrl.entryDelete);

router.post('/art/:article'																			,															artCtrl.entryDeleteSubmit);


router.get('/book/:book'																				,															book.entryDelete);

router.post('/book/:book'																				,															book.entryDeleteSubmit);


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


router.get('/legend/:legend'																		,															legendCtrl.entryDelete);

router.post('/legend/:legend'																		,															legendCtrl.entryDeleteSubmit);


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


router.get('/photo/:photo'																			,															photo.entryDelete);

router.post('/photo/:photo'																			,															photo.entryDeleteSubmit);


router.get('/religion/:religion'																,															religion.religionDelete);

router.post('/religion/:religion'																,															religion.religionDeleteSubmit);


router.get('/video/:video'																			,															video.videoDelete);

router.post('/video/:video'																			,															video.videoDeleteSubmit);


module.exports = router;