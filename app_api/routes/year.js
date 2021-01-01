var router = require('express').Router() , year = require('../controllers/year');



router.get('/year'																				,										year.yearList);

router.get('/year/name/:year'															,										year.yearName);

router.post('/year'																				,										year.yearAdd);	



router.get('/year/d/:year'																,										year.yearDetail);

router.put('/year/:year'																	,										year.yearUpdate);

router.delete('/year/:year'																,										year.yearDelete);




module.exports = router;