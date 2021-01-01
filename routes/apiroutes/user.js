var express = require('express') , router = express.Router() , user = require('../controllers/user');


router.get('/user/profile/:username'					,				user.profile);


module.exports = router;
