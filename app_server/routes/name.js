var express = require('express') , router = express.Router() , name = require('../controllers/name');


router.get('/'																						,														name.names);



router.get('/add'																					,														name.nameAdd);

router.post('/add'																				,														name.nameAddSubmit);



router.get('/:name'																				,														name.nameDetail);




router.get('/:name/update'																,														name.nameUpdate);

router.post('/:name/update'																,														name.nameUpdateSubmit);



router.get('/:name/delete'																,														name.nameDelete);

router.post('/:name/delete'																,														name.nameDeleteSubmit);



module.exports = router;