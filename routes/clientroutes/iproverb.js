var express = require('express') , router = express.Router()  , proverb = require('../controllers/proverb') , dummy = require('../controllers/dummy'); 


//router.get('/:ethnic/proverb/'																,													proverb.proverbDetail);

//router.get('/:ethnic/proverb/animal/alphabet/'									,											proverb.proverbAnimal);

//router.get('/:ethnic/proverb/plant/alphabet/'									,											proverb.proverbPlant);

//router.get('/:ethnic/proverb/:proverb'														, 										proverb.proverbDetail);



//router.get('/:ethnic/proverb/gender/:gender/'									,											proverb.proverbGender);

//router.get('/:ethnic/proverb/alphabet/:alphabet/'							, 										proverb.proverbByAlphabet);

//router.get('/:ethnic/proverb/animal/alphabet/:alphabet/'				, 										proverb.proverbOfAnimalByAlphabet);

//router.get('/:ethnic/proverb/plant/alphabet/:alphabet/'				, 										proverb.proverbOfPlantByAlphabet);



module.exports = router;
