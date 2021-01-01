var express = require('express');

var router = express.Router();

var ctrlAuth = require('../controllers/authentication');

router.get('/users', (req, res, next) => {
																			  res.json({'message' : 'respond with a resource'});
});

router.post('/signup'									, 									ctrlAuth.register);

router.post('/login'										, 									ctrlAuth.login);

module.exports = router;
