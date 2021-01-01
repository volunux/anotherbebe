var express = require('express') , router = express.Router()  , religion = require('../controllers/religion') , dummy = require('../controllers/dummy'); 


//router.get('/:ethnic/religion/'																						,											religion.religionEthnic);

//router.get('/:ethnic/religion/:religion'																	,											religion.religionDetail);

//router.get('/:ethnic/religion/plant/alphabet/'													,											religion.religionPlant);

//router.get('/:ethnic/religion/:religion'																, 										religion.religionDetail);



//router.get('/:ethnic/religion/gender/:gender/'													,											religion.religionGender);

//router.get('/:ethnic/religion/alphabet/:alphabet/'											, 										religion.religionByAlphabet);

//router.get('/:ethnic/religion/animal/alphabet/:alphabet/'								, 										religion.religionOfAnimalByAlphabet);

//router.get('/:ethnic/religion/plant/alphabet/:alphabet/'								, 										religion.religionOfPlantByAlphabet);



module.exports = router;