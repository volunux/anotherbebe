var express = require('express') , router = express.Router() , book = require('../../controllers/book') ,

dress = require('../../controllers/dress') , festival = require('../../controllers/festival') , folktale = require('../../controllers/folktale') , food = require('../../controllers/food') , 

law = require('../../controllers/law') , history = require('../../controllers/history') , history = require('../../controllers/history') , individual = require('../../controllers/individual') , 

life = require('../../controllers/life') , mythology = require('../../controllers/mythology') , name = require('../../controllers/name') , 

photo = require('../../controllers/photo') , sound = require('../../controllers/sound') , proverb = require('../../controllers/proverb') , religion = require('../../controllers/religion') , 

video = require('../../controllers/video') , addCtrl = require('../../controllers/add');

const artCtrl = require('../../controllers/article')('Art' , 'art');

const legendCtrl = require('../../controllers/legend');


router.get('/'																						,															addCtrl.add);



router.get('/art'																					,															artCtrl.entryAdd);

router.post('/art'																				,															artCtrl.entryAddSubmit);


router.get('/book'																				,															book.entryAdd);

router.post('/book'																				,															book.entryAddSubmit);


router.get('/dress'																				,															dress.dressAdd);

router.post('/dress'																			,															dress.dressAddSubmit);


router.get('/festival'																		,															festival.festivalAdd);

router.post('/festival'																		,															festival.festivalAddSubmit);


router.get('/folktale'																		,															folktale.folktaleAdd);

router.post('/folktale'																		,															folktale.folktaleAddSubmit);


router.get('/food'																				,															food.foodAdd);

router.post('/food'																				,															food.foodAddSubmit);


router.get('/history'																			,															history.historyAdd);

router.post('/history'																		,															history.historyAddSubmit);



router.get('/individual'																	,															individual.individualAdd);

router.post('/individual'																	,															individual.individualAddSubmit);


router.get('/law'																					,															law.lawAdd);

router.post('/law'																				,															law.lawAddSubmit);


router.get('/legend'																			,															legendCtrl.entryAdd);

router.post('/legend'																			,															legendCtrl.entryAddSubmit);


router.get('/life'																				,															life.lifeAdd);

router.post('/life'																				,															life.lifeAddSubmit);


router.get('/mythology'																		,															mythology.mythologyAdd);

router.post('/mythology'																	,															mythology.mythologyAddSubmit);


router.get('/name'																				,															name.nameAdd);

router.post('/name'																				,															name.nameAddSubmit);


router.get('/proverb'																			,															proverb.proverbAdd);

router.post('/proverb'																		,															proverb.proverbAddSubmit);


router.get('/photo'																				,															photo.entryAdd);

router.post('/photo'																			,															photo.entryAddSubmit);



router.get('/religion'																		,															religion.religionAdd);

router.post('/religion'																		,															religion.religionAddSubmit);


router.get('/sound'																				,															sound.soundAdd);

router.post('/sound'																			,															sound.soundAddSubmit);


router.get('/video'																				,															video.videoAdd);

router.post('/video'																			,															video.videoAddSubmit);


module.exports = router;