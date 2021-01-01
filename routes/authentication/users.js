var express = require('express') , router = express.Router() , user = require('../controllers/authentication');


router.get('/login' 												, 															user.login);

router.get('/regiser' 											, 															user.register);

module.exports = router;
