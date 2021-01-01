var express = require('express') , router = express.Router() , index = require('../controllers/index') , user = require('../controllers/authentication') , vAuth = require('../config/verifyAuthentication');

router.get('/', (req, res, next) => {
				
				res
						.status(200)
												.json({'message' : 'Welcome to our API'});
});

router.get('/all' , index.all);


module.exports = router;
