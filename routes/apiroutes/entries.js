var express = require('express') , router = express.Router() , entries = require('../controllers/entries') , dummy = require('../../app_server/controllers/dummy');

router.get('/entry' , function(req , res) {

	res.json({'message' : 'Hello World'});

})

router.get('/entry/art'																		,														entries.art);

router.get('/entry/book'																	,														entries.book);

router.get('/entry/dress'																	,														entries.dress);

router.get('/entry/festival'															,														entries.festival);

router.get('/entry/folktale'															,														entries.folktale);

router.get('/entry/food'																	,														entries.food);

router.get('/entry/history'																,														entries.history);

router.get('/entry/individual'														,														entries.individual);

router.get('/entry/law'																		,														entries.law);

router.get('/entry/legend'																,														entries.legend);

router.get('/entry/life'																	,														entries.life);

router.get('/entry/mythology'															,														entries.mythology);

router.get('/entry/name'																	,														entries.name);

router.get('/entry/photo'																	,														entries.photo);

router.get('/entry/proverb'																,														entries.proverb);

router.get('/entry/religion'															,														entries.religion);

router.get('/entry/sound'																	,														entries.sound);

router.get('/entry/video'																	,														entries.video);



//router.get('/art/:ethnic/:art/'													,														entries.artDetailDet);

//router.get('/art/:ethnic/alphabet/'										,														arts.artsByAlphabet);


module.exports = router;