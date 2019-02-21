var express = require('express') , router = express.Router()  , name = require('../controllers/name');


router.get('/:ethnic/name'														, 										name.nameEthnic);

router.get('/:ethnic/name/:alphabet/:name'						,											name.nameDetail);

router.get('/:ethnic/name/:alphabet/'									, 										name.nameByAlphabet);



module.exports = router;
