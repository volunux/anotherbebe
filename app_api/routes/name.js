var express = require('express') , router = express.Router() , name = require('../controllers/name');

router.get('/oruko'																						,														name.namesAll);

router.get('/oruko/specie/:specie'														,														name.nameSpecies);


router.get('/oruko/name/:name'																,														name.nameInfo);



router.get('/oruko/nation/:ethnic/'														,														name.nameEthnicByHuman);

router.get('/oruko/animal/:ethnic'														,														name.nameEthnicByAnimal);

router.get('/oruko/plant/:ethnic'															,														name.nameEthnicByPlant);



router.get('/oruko/nation/:ethnic/gender/:gender/'						,														name.nameByGender);




router.get('/oruko/:ethnic/nation/alphabet/:alphabet/'				,														name.nameByHuman);

router.get('/oruko/:ethnic/animal/alphabet/:alphabet/'				,														name.nameByAnimal);

router.get('/oruko/:ethnic/plant/alphabet/:alphabet/'					,														name.nameByPlant);




router.get('/oruko/d/:name'																		,														name.nameDetail);

router.get('/oruko/animal/d/:name'														,														name.nameAnimalDetail);

router.get('/oruko/plant/d/:name'															,														name.namePlantDetail);



module.exports = router;