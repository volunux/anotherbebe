var express = require('express') , router = express.Router() , name = require('../controllers/name');


router.get('/'																						,														name.names);

router.get('/add'																					,														name.nameAdd);

router.get('/:name/update'																,														name.nameUpdate);

router.get('/:name/delete'																,														name.nameDelete);


module.exports = router;
