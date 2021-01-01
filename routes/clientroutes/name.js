var express = require('express') , router = express.Router() , name = require('../controllers/name');


router.get('/'																						,															name.namesAll);



router.get('/nation/'																			,															name.nameEthnicList);

router.get('/animal/'																			,															name.nameAnimalList);

router.get('/plant/'																			,															name.namePlantList);




router.get('/nation/:ethnic/'															,															name.nameHuman);

router.get('/animal/:ethnic/'															,															name.nameEthnicAnimal);

router.get('/plant/:ethnic/'															,															name.nameEthnicPlant);





router.get('/:ethnic/name/gender/:gender/'									,											name.nameGender);



//router.get('/nation/:ethnic/animal/:name'								,															name.nameAnimalDetail);

//router.get('/nation/:ethnic/plant/:name'								,															name.namePlantDetail);


//router.get('/nation/:ethnic/animal/alphabet/'					,															name.nameAnimal);

//router.get('/nation/:ethnic/plant/alphabet/'					,															name.namePlant);



router.get('/nation/:ethnic/alphabet/'										, 														name.nameHumanAlphabet);

router.get('/animal/:ethnic/alphabet/'										, 														name.nameAnimalAlphabet);

router.get('/plant/:ethnic/alphabet/'											, 														name.namePlantAlphabet);




router.get('/nation/:ethnic/:name'												, 														name.nameDetail);

router.get('/animal/:ethnic/:name'												, 														name.nameAnimalDetail);

router.get('/plant/:ethnic/:name'													, 														name.namePlantDetail);




router.get('/nation/:ethnic/alphabet/:alphabet/'					, 														name.nameByAlphabet);

router.get('/animal/:ethnic/alphabet/:alphabet/'					, 														name.nameAnimalByAlphabet);

router.get('/plant/:ethnic/alphabet/:alphabet/'						, 														name.namePlantByAlphabet);


//router.get('/:ethnic/name/plant/alphabet/'							,															name.namePlant);

//router.get('/:name'																			,															name.nameDetail);





//router.get('/name'																			,															name.nameUpdate);

//router.post('/name'																			,															name.nameUpdateSubmit);


//router.get('/:name/update'																,														name.nameUpdate);

//router.post('/:name/update'																,														name.nameUpdateSubmit);



//router.get('/:name/delete'																,														name.nameDelete);

//router.post('/:name/delete'																,														name.nameDeleteSubmit);



module.exports = router;