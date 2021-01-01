var express = require('express'),			router = express.Router(),		specie = require('../controllers/specie');



router.get('/specie'										,		specie.specieList);

router.get('/specie/name/:specie'				,		specie.specieName);

router.post('/specie'										,		specie.specieAdd);	



router.get('/specie/:specie'						,		specie.specieDetail);

router.put('/specie/:specie'						,		specie.specieUpdate);

router.delete('/specie/:specie'					,		specie.specieDelete);




module.exports = router;