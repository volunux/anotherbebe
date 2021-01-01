var express = require('express') , router = express.Router()  , dress = require('../controllers/dress') , dummy = require('../controllers/dummy'); 


//router.get('/:ethnic/dress/'																						,											dress.dressEthnic);

//router.get('/:ethnic/dress/:dress'																			,											dress.dressDetail);

//router.get('/:ethnic/dress/plant/alphabet/'													,											dress.dressPlant);

//router.get('/:ethnic/dress/:dress'																		, 										dress.dressDetail);



//router.get('/:ethnic/dress/gender/:gender/'													,											dress.dressGender);

//router.get('/:ethnic/dress/alphabet/:alphabet/'											, 										dress.dressByAlphabet);

//router.get('/:ethnic/dress/animal/alphabet/:alphabet/'							, 										dress.dressOfAnimalByAlphabet);

//router.get('/:ethnic/dress/plant/alphabet/:alphabet/'								, 										dress.dressOfPlantByAlphabet);



module.exports = router;