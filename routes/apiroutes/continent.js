var express = require('express'),			router = express.Router(),		continent = require('../controllers/continent');



router.get('/continent'										,		continent.continentList);

//router.get('/continent/name/:continent'				,		continent.continentName);

router.post('/continent'									,		continent.continentAdd);	




//router.get('/continent/:continent'						,		continent.continentDetail);

//router.put('/continent/:continent'						,		continent.continentUpdate);

//router.delete('/continent/:continent'					,		continent.continentDelete);




module.exports = router;