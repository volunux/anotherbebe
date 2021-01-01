var express = require('express') , router = express.Router() , food = require('../controllers/food') , dummy = require('../../app_server/controllers/dummy');

router.get('/food'																				,														food.foods);

router.post('/food'																				,														food.foodAddSubmit);

	



router.get('/food/add'																		,														food.foodAdd);

router.get('/food/okan/:food'															,														food.foodName);

router.get('/food/:food/update'														,														food.foodUpdate);
		




router.get('/food/country/:country/'											,														food.foodCountry);

router.get('/food/ethnic/:ethnic/'												,														food.foodEthnic);



router.get('/food/:food/'																	,														food.foodDetail);

router.put('/food/:food'																	,														food.foodUpdateSubmit);

router.delete('/food/:food'																,														food.foodDelete);



//router.get('/food/:ethnic/alphabet/'										,														food.foodByAlphabet);


module.exports = router;