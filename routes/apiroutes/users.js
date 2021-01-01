var express = require('express') , router = express.Router() , ctrlAuth = require('../controllers/authentication');


router.get('/user/profile/:username'					,				user.profile);


module.exports = router;
