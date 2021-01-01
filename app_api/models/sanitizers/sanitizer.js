const { sanitizeBody } = require('express-validator/filter');

var sanitize = require('mongo-sanitize');

module.exports = {

	'sanitizeBody' :  [ 	

				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	

						return next();

	}] , 

	'cleanBody' : (req , res , next) => {

			sanitize(req.body);

			return next();
	}

}