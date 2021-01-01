var express = require('express') , router = express.Router() , dummy = require('../controllers/dummy') , authentication = require('../controllers/authentication');


router.get('/signup'										, 				authentication.signup);

router.post('/signup'										, 				authentication.signupSubmit);

router.post('/signin'										, 				authentication.signin);

router.get('/logout'										,					authentication.signout);




module.exports = router;