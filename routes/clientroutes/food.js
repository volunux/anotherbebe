var express = require('express') , router = express.Router() , food = require('../controllers/food') , dummy = require('../controllers/dummy');


router.get('/'																					,															food.foodAll);





router.get('/country/'																	,															food.foodCountryList);

router.get('/nation/'																		,															food.foodEthnicList);





router.get('/:food'																			,															food.foodDetail);





router.get('/nation/:ethnic/'														,															food.foodEthnic);

router.get('/country/:country'													,															food.foodCountry);




//router.get('/:food/update'														,														food.foodUpdate);

//router.post('/:food/update'														,														food.foodUpdateSubmit);



//router.get('/:food/delete'														,														food.foodDelete);
	
//router.post('/:food/delete'														,														food.foodDeleteSubmit);



module.exports = router;