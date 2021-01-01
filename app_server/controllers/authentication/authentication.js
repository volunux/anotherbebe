const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var User = require('../../../app_api/models/users'), eConfig = require('../../config/eyon') , aConfig = require('../../config/authentication') , kEncryptor = require('../../../app_api/config/kEncryptor') ,

axios = require('axios') , url = '' , data = '' , ethnic = '' , eyon = '' ,  multer = require('multer') , uUpdate = {} , errors = '', upload = multer({ 'storage' : aConfig.mConfig }) , country = '' ,

clientErr = require('../helpers/compiledError');

module.exports = {

	'register' : (req , res , next) => {

			if (req.cookies.sid3 && req.cookies.sid2) {
																									return res.redirect('/');		}
			axios({  'method': 'get' ,
															  	'url' : `${aConfig.reqOptions.url}signup` })

			.then((response) => { 		data = response.data , eyon = data.Eyon , country = data.Country;

																														res.render('authentication/register' , {'title' : 'Sign up for an Account' , 'eyons' : eyon , 'countries' : country , 'rmethod' : 'POST'	})		})
						.catch((err) => {		status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} ,

	'registerSubmit' : [ 

				upload.single('profile_photo') ,

				body('full_name'						,		'Full Name should be provided and cannot be empty.')					.isLength({ 'min' : 4 })
																																																															.withMessage('Full Name cannot be less than 4 character in length.')
																																																			.isLength({ 'max' : 20})
																																																															.withMessage('Full Name cannot be greater than 20 characters in length.')
																																																			.trim() ,

				body('username'						,		'Username should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Username cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 15 })
																																																															.withMessage('Username cannot be greater than 15 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'Ethnicity should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'Country of Origin should be provided and cannot be empty.')	.isLength({ 'min' : 1 }).trim() ,

				body('email_address'				, 	'Email Address should be provided and cannot be empty')				.isLength({ 'min' : 8 })
																																																															.withMessage('Email Address cannot be less than 8 character in length.')
																																																			.isLength({ 'max' : 30})
																																																															.withMessage('Email Address cannot be greater than 30 characters in length.')
																																																			.isEmail()
																																																															.withMessage('Email Address should be in valid format.')
																																																			
																																																			.trim().normalizeEmail().escape() ,

				body('password'								,		'Password should be provided and cannot be empty.')					.isLength({ 'min' : 7 })
																																																															.withMessage('Password cannot be less than 8 character in length.')
																																																			.isLength({ 'max' : 35})
																																																															.withMessage('Password cannot be greater than 35 characters in length.')
																																																			.trim() ,
				sanitizeBody('*').trim() ,

				aConfig.checkFileUpload , aConfig.validate , aConfig.addFileUpload ,

				(req , res , next) => {		user = new User(req.body);

				errors = validationResult(req);

				errArr = errors.array();
																						if (req.body.error2) {	errArr.push(req.body.error2);		}

																						if (req.body.error3) {	errArr.push(req.body.error3);		}

					if (errArr.length != 0) {					if (req.file && req.body.error3) { 
																																								uConfig.delete(req , errArr); }
								url = `${aConfig.reqOptions.url}signup`;	

								axios.get(url).then((response) => {		data = response.data ,	eyon = data.Eyon , country = data.Country;

														res.render('authentication/register' , { 'title': 'Sign up for an account' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errArr , 'rmethod' : 'POST' 	});		})			}
  							else {
												axios({  	'method': 'post' ,
																								  		'url' : `${aConfig.reqOptions.url}signup` ,
																	  															 																'data' : req.body 	})
															.then((response) => {	data = response.data;
																																					kEncryptor.setCookie(res , data);
																																																						req.flash('info', 'You have successfully signed up and welcome.');
																																																																																								res.redirect('/user/dashboard');	})
																.catch((err) => { errors = [];
																																if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${aConfig.reqOptions.url}signup`;
																																		
												axios.get(url).then((response) => { 	data = response.data ,	eyon = data.Eyon , country = data.Country;
																																																																				clientErr.formAdd(err , errors);
																		
													res.render('authentication/register' , { 'title': 'Sign up for an account' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errors , 'rmethod' : 'POST'});	})
																																																																																													
																																																																																													return false;		}
																																if (err.response.status == 409) { 	url = `${aConfig.reqOptions.url}signup`;
																																		
												axios.get(url).then((response) => { 	data = response.data ,	eyon = data.Eyon , country = data.Country , errors.push(err.response.data);
																		
													res.render('authentication/register' , { 'title': 'Sign up for an account' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errors , 'rmethod' : 'POST' 	});		})
																																																																																														
																																																																																														return false;		}
																										status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}


	}] , 

	'login' : (req , res , next) => {

			if (req.cookies.sid && req.cookies.sid2) {
																									return res.redirect('/');		}

																									res.render('authentication/login' , { 'title': 'Sign in to your account' , 'rmethod' : 'POST' });
	} ,

	'loginSubmit' : [

				body('email_address'				, 	'Email Address should be provided and cannot be empty')				.isLength({ 'min' : 8 })
																																																															.withMessage('Email Address cannot be less than 8 characters in length.')
																																																			.isLength({ 'max' : 30})
																																																															.withMessage('Email Address cannot be greater than 30 characters in length.')
																																																			.isEmail()
																																																															.withMessage('Email Address should be in valid format.')
																																																			
																																																			.trim().normalizeEmail().escape() ,

				body('password'							,		'Password should be provided and cannot be empty.')						.isLength({ 'min' : 7 })
																																																															.withMessage('Password cannot be less than 7 characters in length.')
																																																			.isLength({ 'max' : 35})
																																																															.withMessage('Password cannot be greater than 35 characters in length.')
																																																			.trim() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		user = new User(req.body);

				errors = validationResult(req);

				errArr = errors.array();

					if (errArr.length != 0) {
																		res.render('authentication/login' , { 'title': 'Sign in to your account' , 'errors' : errArr , 'rmethod' : 'POST' });		}
  							else {
												axios({  	'method': 'post' ,
																								  		'url' : `${aConfig.reqOptions.url}signin` ,
												  															 																					'data' : req.body 	})
												.then((response) => {	data = response.data;
																																		kEncryptor.setCookie(res , data);
																																																			req.flash('info', 'You have successfully signed in.');
																																																																															res.redirect('/user/dashboard')				})
															.catch((err) => {		status = err.response , errors = [];

																																if (err.response.status == 400 || err.response.statusText == 'Bad Request') {	errors = errors.push(status.data.status);
																		
																																											res.render('authentication/login' , { 'title': 'Sign in to your account' , 'errors' : errors , 'rmethod' : 'POST' 	});
																																																																																												
																																																																																												return false;		}
																																	if (status.status == 401) {	errors.push(status.data.status);
																																																												
																																								return res.render('authentication/login' , {'title' : 'Sign in to your account' , 'errors' : errors , 'rmethod' : 'POST' 	})		}

																																	if (status.status == 403) {	errors = errors.push(status.data.status)
																																																												
																																								return res.render('error' , {'title' : 'Error' , 'errors' : errors 	})			}

																																												res.render('error' , {'title' : 'Error' , 'error' : status 		}); });			}
	}] ,

	'logout' : (req , res , next) => {

			if (req.cookies.sid && req.cookies.sid2) {
																									res.clearCookie('sid');
																									res.clearCookie('sid2');
																									res.clearCookie('sid3');
																									res.clearCookie('s_id');	}
										    
										    req.flash('info', 'You have successfully signed out.');

																									res.redirect('/');
	} 

}