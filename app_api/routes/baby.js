var router = require('express').Router() , baby = require('../controllers/baby');



router.get('/baby'																				,										baby.babyList);

router.get('/baby/name/:baby'															,										baby.babyName);

router.post('/baby'																				,										baby.babyAdd);	



router.get('/baby/d/:baby'																,										baby.babyDetail);

router.put('/baby/:baby'																	,										baby.babyUpdate);

router.delete('/baby/:baby'																,										baby.babyDelete);




module.exports = router;