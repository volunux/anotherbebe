var router = require('express').Router() , eyon = require('../controllers/eyon');



router.get('/eyon'																				,										eyon.eyonList);

router.get('/eyon/name/:eyon'															,										eyon.eyonName);

router.post('/eyon'																				,										eyon.eyonAdd);	



router.get('/eyon/d/:eyon'																,										eyon.eyonDetail);

router.put('/eyon/:eyon'																	,										eyon.eyonUpdate);

router.delete('/eyon/:eyon'																,										eyon.eyonDelete);




module.exports = router;