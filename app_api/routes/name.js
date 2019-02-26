var express = require('express') , router = express.Router() , name = require('../controllers/name') , dummy = require('../../app_server/controllers/dummy');

router.get('/oruko'																					,														name.names);


router.get('/oruko/name/:name'															,														name.nameName);

router.post('/oruko'																				,														name.nameAddSubmit);



router.get('/oruko/add'																			,														name.nameAdd);

router.get('/oruko/:name/update'														,														name.nameUpdate);





router.get('/oruko/:name'																		,														name.nameDetail);

router.put('/oruko/:name'																		,														name.nameUpdateSubmit);

router.delete('/oruko/:name'																,														name.nameDelete);



//router.get('/oruko/:ethnic/alphabet/'												,														name.nameByAlphabet);

router.get('/oruko/:ethnic/gender/:gender/'									,														name.nameByGender);



router.get('/oruko/:ethnic/human/alphabet/:alphabet/'				,														name.nameByHuman);

router.get('/oruko/:ethnic/animal/alphabet/:alphabet/'			,														name.nameByAnimal);

router.get('/oruko/:ethnic/plant/alphabet/:alphabet/'				,														name.nameByPlant);


router.get('/oruko/:ethnic/human/'													,														name.nameByHumanAll);


module.exports = router;