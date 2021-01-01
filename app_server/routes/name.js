var express = require('express') , router = express.Router() , name = require('../controllers/name');


router.get('/'																						,															name.namesAll);

router.get('/animal/list'																	,															name.nameAnimalAll);

router.get('/plant/list'																	,															name.namePlantAll);



router.get('/nation/'																			,															name.nameEthnicList);

router.get('/animal/'																			,															name.nameAnimalList);

router.get('/plant/'																			,															name.namePlantList);



router.get('/nation/:ethnic/'															,															name.nameHuman);

router.get('/animal/:ethnic/'															,															name.nameEthnicAnimal);

router.get('/plant/:ethnic/'															,															name.nameEthnicPlant);



router.get('/nation/:ethnic/gender/:gender/'							,															name.nameGender);



router.get('/nation/:ethnic/alphabet/'										, 														name.nameHumanAlphabet);

router.get('/animal/:ethnic/alphabet/'										, 														name.nameAnimalAlphabet);

router.get('/plant/:ethnic/alphabet/'											, 														name.namePlantAlphabet);



router.get('/nation/:ethnic/:name'												, 														name.nameDetail);

router.get('/animal/:ethnic/:name'												, 														name.nameAnimalDetail);

router.get('/plant/:ethnic/:name'													, 														name.namePlantDetail);



router.get('/nation/:ethnic/alphabet/:alphabet/'					, 														name.nameByAlphabet);

router.get('/animal/:ethnic/alphabet/:alphabet/'					, 														name.nameAnimalByAlphabet);

router.get('/plant/:ethnic/alphabet/:alphabet/'						, 														name.namePlantByAlphabet);


module.exports = router;