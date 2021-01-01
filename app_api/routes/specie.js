var router = require('express').Router() , specie = require('../controllers/specie');



router.get('/specie'																					,										specie.specieList);

router.get('/specie/name/:specie'															,										specie.specieName);

router.post('/specie'																					,										specie.specieAdd);	



router.get('/specie/d/:specie'																,										specie.specieDetail);

router.put('/specie/:specie'																	,										specie.specieUpdate);

router.delete('/specie/:specie'																,										specie.specieDelete);




module.exports = router;