var express = require('express') , router = express.Router() , art = require('../controllers/art') , dummy = require('../controllers/dummy') , book = require('../controllers/book') ,

dress = require('../controllers/dress') , festival = require('../controllers/festival') , folktale = require('../controllers/folktale') , food = require('../controllers/food') , law = require('../controllers/law') ,

history = require('../controllers/history') , history = require('../controllers/history') , individual = require('../controllers/individual') , legend = require('../controllers/legend') ,

life = require('../controllers/life') , mythology = require('../controllers/mythology') , name = require('../controllers/name') , photo = require('../controllers/photo') , 

proverb = require('../controllers/proverb') , religion = require('../controllers/religion') , video = require('../controllers/video'); 


router.get('/'																						,															function(req , res) {

						res.render('user/add');
});



router.get('/art'																					,															art.artAdd);

router.post('/art'																				,															art.artAddSubmit);


router.get('/book'																				,															book.bookAdd);

router.post('/book'																				,															book.bookAddSubmit);


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


router.get('/legend'																			,															legend.legendAdd);

router.post('/legend'																			,															legend.legendAddSubmit);


router.get('/life'																				,															life.lifeAdd);

router.post('/life'																				,															life.lifeAddSubmit);


router.get('/mythology'																		,															mythology.mythologyAdd);

router.post('/mythology'																	,															mythology.mythologyAddSubmit);


router.get('/name'																				,															name.nameAdd);

router.post('/name'																				,															name.nameAddSubmit);


router.get('/proverb'																			,															proverb.proverbAdd);

router.post('/proverb'																		,															proverb.proverbAddSubmit);


router.get('/photo'																				,															photo.photoAdd);

router.post('/photo'																			,															photo.photoAddSubmit);


router.get('/religion'																		,															religion.religionAdd);

router.post('/religion'																		,															religion.religionAddSubmit);


router.get('/video'																				,															video.videoAdd);

router.post('/video'																			,															video.videoAddSubmit);


module.exports = router;