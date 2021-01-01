var express = require('express') , router = express.Router() , book = require('../../controllers/book') ,

dress = require('../../controllers/dress') , festival = require('../../controllers/festival') , folktale = require('../../controllers/folktale') , food = require('../../controllers/food') , 

law = require('../../controllers/law') , history = require('../../controllers/history') , history = require('../../controllers/history') , individual = require('../../controllers/individual') , 

life = require('../../controllers/life') , mythology = require('../../controllers/mythology') , name = require('../../controllers/name') , 

photo = require('../../controllers/photo') , sound = require('../../controllers/sound') , proverb = require('../../controllers/proverb') , religion = require('../../controllers/religion') , 

video = require('../../controllers/video') , updateCtrl = require('../../controllers/update');

const artCtrl = require('../../controllers/article')('Art' , 'art');

const legendCtrl = require('../../controllers/legend');

router.get('/'																									,														updateCtrl.update);


router.get('/art' 																							,														updateCtrl.art);
router.get('/book' 																							,														updateCtrl.book);
router.get('/dress' 																						,														updateCtrl.dress);
router.get('/festival' 																					,														updateCtrl.festival);
router.get('/folktale' 																					,														updateCtrl.folktale);
router.get('/food' 																							,														updateCtrl.food);
router.get('/history' 																					,														updateCtrl.history);
router.get('/individual' 																				,														updateCtrl.individual);
router.get('/law' 																							,														updateCtrl.law);
router.get('/legend' 																						,														updateCtrl.legend);
router.get('/life' 																							,														updateCtrl.life);
router.get('/mythology' 																				,														updateCtrl.mythology);
router.get('/name' 																							,														updateCtrl.name);
router.get('/photo' 																						,														updateCtrl.photo);
router.get('/proverb' 																					,														updateCtrl.proverb);
router.get('/religion' 																					,														updateCtrl.religion);
router.get('/sound' 																						,														updateCtrl.sound);
router.get('/video' 																						,														updateCtrl.video);



router.get('/art/:article'																			,															artCtrl.entryUpdate);

router.post('/art/:article'																			,															artCtrl.entryUpdateSubmit);


router.get('/book/:book'																				,															book.entryUpdate);

router.post('/book/:book'																				,															book.entryUpdateSubmit);


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


router.get('/legend/:legend'																		,															legendCtrl.entryUpdate);

router.post('/legend/:legend'																		,															legendCtrl.entryUpdateSubmit);


router.get('/life/:life'																				,															life.lifeUpdate);

router.post('/life/:life'																				,															life.lifeUpdateSubmit);


router.get('/mythology/:mythology'															,															mythology.mythologyUpdate);

router.post('/mythology/:mythology'															,															mythology.mythologyUpdateSubmit);


router.get('/name/nation/:ethnic/:name/'												,															name.nameUpdate);

router.post('/name/nation/:ethnic/:name/'												,															name.nameUpdateSubmit);



router.get('/name/animal/:ethnic/:name/'												,															name.nameAnimalUpdate);

router.post('/name/animal/:ethnic/:name/'												,															name.nameAnimalUpdateSubmit);



router.get('/name/plant/:ethnic/:name/'													,															name.namePlantUpdate);

router.post('/name/plant/:ethnic/:name/'												,															name.namePlantUpdateSubmit);


router.get('/proverb'																						,															proverb.proverbUpdate);

router.post('/proverb'																					,															proverb.proverbUpdateSubmit);


router.get('/photo/:photo'																			,															photo.entryUpdate);

router.post('/photo/:photo'																			,															photo.entryUpdateSubmit);


router.get('/religion/:religion'																,															religion.religionUpdate);

router.post('/religion/:religion'																,															religion.religionUpdateSubmit);


router.get('/video/:video'																			,															video.videoUpdate);

router.post('/video/:video'																			,															video.videoUpdateSubmit);


module.exports = router;