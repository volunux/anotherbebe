var express = require('express') , router = express.Router()  , name = require('../controllers/name') , dummy = require('../controllers/dummy'); 

//router.get('/:ethnic/name/'																	,											name.nameHuman);

//router.get('/:ethnic/name/animal/alphabet/'									,											name.nameAnimal);

//router.get('/:ethnic/name/plant/alphabet/'									,											name.namePlant);

//router.get('/:ethnic/name/:name'														, 										name.nameDetail);


//router.get('/:ethnic/name/:name/update'											,											name.nameUpdate);

//router.post('/:ethnic/name/:name/update'										,											name.nameUpdateSubmit);


//router.get('/:ethnic/name/:name/delete'											,											name.nameDelete);

//router.post('/:ethnic/name/:name/delete'										,											name.nameDeleteSubmit);


// router.get('/:ethnic/name/gender/:gender/'									,											name.nameGender);

//router.get('/:ethnic/name/alphabet/:alphabet/'							, 										name.nameByAlphabet);

//router.get('/:ethnic/name/animal/alphabet/:alphabet/'				, 										name.nameOfAnimalByAlphabet);

//router.get('/:ethnic/name/plant/alphabet/:alphabet/'				, 										name.nameOfPlantByAlphabet);



module.exports = router;
