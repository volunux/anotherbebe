var express = require('express') , router = express.Router() , dummy = require('../controllers/dummy');


router.get('/'																						,														dummy.achievement);

module.exports = router;
