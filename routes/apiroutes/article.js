var express = require('express') , router = express.Router() , dummy = require('../controllers/dummy');


router.get('/'																						,														dummy.article);

module.exports = router;
