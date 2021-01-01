const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var User = require('../../app_api/models/users') ,  uConfig = require('../config/user') , axios = require('axios') , url = '' , data = '' , ethnic = '' , eyon = '' , multer = require('multer') , uUpdate = {} , 

errors = '' , errArr = '' , country = '' , countries = ''; upload = multer({ 'storage' : uConfig.mConfig }) , cConfig = require('../config/country') , clientErr = require('./helpers/compiledError');

module.exports = {

	'user' : (req , res , next) => {
																																				res.redirect('/user/dashboard');
	} ,

	'dashboard' : (req , res , next) => {	url = `${uConfig.reqOptions.url}dashboard`;
	
		axios.get(url)
									.then((response) => {	data = response.data.status ,

																				dress = data.Dress , festival = data.Festival , folktale = data.Folktale , food = data.Food , law = data.Law , legend = data.Legend , life = data.Life ,

																				mythology = data.Mythology , religion = data.Religion , photo = data.Photo , sound = data.Sound , video = data.Video;

																											res.render('user/dashboard' , { 'title' : 'Dashboard' , 'dresses' : dress , 'festivals' : festival , 'folktales' : folktale , 'foods' : food , 'laws' : law ,

																																											 'legends' : legend ,	'lifes' : life , 'mythologies' : mythology , 'religions' : religion , 'photos' : photo ,

																																									  		'sounds' : sound , 'vdieos' : video	});		})
									.catch((err) => { status = err.response;
																															res.render('error' , {'title' : 'Error' , 'error' : status 	})			})
		} ,

	'profile' : (req , res , next) => {

			axios({ 'method': 'get' ,
														 		'url' : `${uConfig.reqOptions.url}profile`
																																										 			})
			.then((response) => { 		data = response.data.status;
																																			res.render('user/profile' , {'title' : 'Profile Details' , 'user' : data 	})		})
						.catch((err) => {		status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	})		});
	} ,	

	'profileUpdate' : (req , res , next) => {

			axios({ 'method': 'get' ,
														 		'url' : `${uConfig.reqOptions.url}profile/update`		})

			.then((response) => { 		data = response.data.status , eyon = data.Eyon , country = data.Country , user  = data.User;

																																			res.render('authentication/register' , {'title' : 'Update Profile' , 'user' : user , 'eyons' : eyon , 'countries' : country	})		})
						.catch((err) => {		status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	})								});
	} ,

		'profileUpdateSubmit' : [ 

				upload.single('profle_photo') ,

				body('full_name'						,		'Full Name should be provided and cannot be empty.')					.isLength({ 'min' : 4 })
																																																															.withMessage('Full Name cannot be less than 4 characters in length.')
																																																			.isLength({ 'max' : 20})
																																																															.withMessage('Full Name cannot be greater than 20 characters in length.')
																																																			.trim() ,

				body('username'							,		'Username should be provided and cannot be empty.')						.isLength({ 'min' : 1 })
																																																															.withMessage('Username cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 15 })
																																																															.withMessage('Username cannot be greater than 15 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'Ethnicity should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'Country of Origin should be provided and cannot be empty.')	.isLength({ 'min' : 1 }).trim() ,

				body('email_address'				, 	'Email Address should be provided and cannot be empty')				.isLength({ 'min' : 8 })
																																																															.withMessage('Email Address cannot be less than 8 characters in length.')
																																																			.isLength({ 'max' : 30})
																																																															.withMessage('Email Address cannot be greater than 30 characters in length.')
																																																			.isEmail()
																																																															.withMessage('Email Address should be in valid format.')
																																																			
																																																			.trim().normalizeEmail().escape() ,

				body('password'								,		'Password should be provided and cannot be empty.')					.isLength({ 'min' : 8 })
																																																															.withMessage('Password cannot be less than 8 characters in length.')
																																																			.isLength({ 'max' : 35})
																																																															.withMessage('Password cannot be greater than 35 characters in length.')
																																																			.trim() ,
			sanitizeBody('*').trim() ,

			uConfig.validate , uConfig.addFileUpload ,

			(req , res , next) => {		user = new User(req.body);

			errors = validationResult(req);

			errArr = errors.array();
																					if (req.body.error3) {	errArr.push(req.body.error3);		}

				if (errArr.length != 0) {					if (req.file && req.body.error3) { 
																																							uConfig.delete(req , errArr); }
							url = `${uConfig.reqOptions.url}profile/update`;	

							axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

													res.render('authentication/register' , { 'title': 'Update Profile' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errArr 		});		})			}
							else {
											axios({  	'method': 'put' ,
																							  	'url' : `${uConfig.reqOptions.url}profile/update` ,
																  														 																				'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'You have successfully updated your profile.');
																																																																											res.redirect('/user/profile')})
															.catch((err) => { errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${uConfig.reqOptions.url}profile/update` ;
																																	
											axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																			clientErr.formAdd(err , errors);
																	
												res.render('authentication/register' , { 'title': 'Update Profile' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errors });		})
																																																																																									return false;		}
																															if (err.response.status == 409) { 	url = `${uConfig.reqOptions.url}profile/update` ;
																																	
											axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , errors.push(err.response.data.status);

												res.render('authentication/register' , { 'title': 'Update Profile' , 'eyons' : eyon , 'countries' : country , 'user' : user , 'errors' : errors });		})
																																																																																									return false;		}
																									status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
		}] ,  

}