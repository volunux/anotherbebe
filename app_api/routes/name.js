var express = require('express') , router = express.Router() , name = require('../controllers/name');


router.get('/'																						,														name.names);

router.post('/name'																				,														name.nameAddSubmit);

router.get('/name/add'																		,														name.nameAdd);

router.get('/name/:name/update'														,														name.nameUpdate);

router.get('/name/:name'																	,														name.nameDetail);

router.get('/name/name/:name'															,														name.nameName);

router.put('/name/:name'																	,														name.nameUpdateSubmit);

router.delete('/name/:name'																,														name.nameDelete);

router.get('/name/:ethnic/alphabet/:alphabet/'						,														name.nameByAlphabet);

router.get('/name/:ethnic/gender/:gender/'								,														name.nameByGender);

module.exports = router;
