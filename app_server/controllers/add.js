const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , art = '' , status = '' , errors = '' , errArr = '' , eConfig = require('../config/entry');

module.exports = {

	'add' : (req , res , next) => {
																																				res.render('user/add' , { 'title' : 'Add entry by category' });
	} , 

}