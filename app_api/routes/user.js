var express = require('express') , router = express.Router() , user = require('../controllers/user');


router.get('/user/dashboard/'									,														user.dashboard);

router.get('/user/profile/'										,														user.profile);

router.get('/user/profile/update'							,														user.profileUpdate);

router.put('/user/profile/update'							,														user.profileUpdateSubmit);


module.exports = router;
