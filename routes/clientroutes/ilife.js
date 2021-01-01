var express = require('express') , router = express.Router()  , life = require('../controllers/life') , dummy = require('../controllers/dummy'); 


//router.get('/:ethnic/life/'																					,											life.lifeEthnic);

//router.get('/:ethnic/life/:life'																		,											life.lifeDetail);

//router.get('/:ethnic/life/plant/alphabet/'												,											life.lifePlant);

//router.get('/:ethnic/life/:life'																	, 										life.lifeDetail);



//router.get('/:ethnic/life/gender/:gender/'												,											life.lifeGender);

//router.get('/:ethnic/life/alphabet/:alphabet/'										, 										life.lifeByAlphabet);

//router.get('/:ethnic/life/animal/alphabet/:alphabet/'							, 										life.lifeOfAnimalByAlphabet);

//router.get('/:ethnic/life/plant/alphabet/:alphabet/'							, 										life.lifeOfPlantByAlphabet);



module.exports = router;