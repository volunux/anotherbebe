const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Dress = require('../../app_api/models/dress') , eConfig = require('../config/eyon') , dConfig = require('../config/dress') , axios = require('axios') , url = '' , 

data = '' , ethnic = '' , dress = '' , eyon = '' , dParam = '' , dUpdate = {} , dDelete = '' , pConfig = require('../config/photo') , multer = require('multer') , upload = multer({ 'storage' : pConfig.multer }) , 

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'dressAll' : (req , res , next) => { url = `${dConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('dress/list_dress' , { 'title': 'List of Dress' , 'dresses' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Dress entries not available' , 'error' : status 	})			});
	} ,

	'dressCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('dress/list_country' , { 'title': 'List of Dress of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})			});
	} ,

	'dressEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('dress/list_ethnic' , { 'title': 'List of Dress of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'dressCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${dConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Dress`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('dress/list_dress' , { 'title' : title , 'dresses' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Dress entries not available' , 'error' : status 		})						});
	} ,	

	'dressEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${dConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Dresss`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('dress/list_dress' , { 'title' : title , 'dresses' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Dress entries not available' , 'error' : status 		})			});
	} ,	

	'dressDetail' : (req , res , next) => { 	dress = req.params.dress , url = `${dConfig.reqOptions.url}d/${dress}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('dress/dress_detail' , { 'title' : title , 'dress' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Dress entry not available' , 'error' : status 	})			});
	} ,

	'dressAdd' : (req , res , next) => {	url = `${dConfig.reqOptions.url}add`;	

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/dress_add' , { 'title': 'Add a new Dress' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'dressAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Dress body cannot be empty and should be provided')					.isLength({ 'min' : 1 })
																																																																.withMessage('Dress body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Dress body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		dress = new Dress(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${dConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/dress_add' , { 'title': 'Add a new Dress'  , 'eyons' : eyon , 'countries' : country , 'dress' : dress , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : dConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/dress/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${dConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
														res.render('forms/add_forms/dress_add' , { 'title': 'Add a new Dress'  , 'eyons' : eyon , 'countries' : country , 'dress' : dress , 'errors' : errors });		})
																																																																																														return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}																																																	
	}] , 

	'dressUpdate' : (req , res , next) => {	dress = req.params.dress , url = `${dConfig.reqOptions.url}update/${dress}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , dress = data.Dress , country = data.Country;

			dUpdate['title'] = dress.title;
																					res.render('forms/add_forms/dress_add' , { 'title': `Update Dress ${dUpdate.title}` , 'eyons' : eyon , 'dress' : dress , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'dressUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Dress body cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																																.withMessage('Dress body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Dress body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	dParam = req.params.dress;

				dress = new Dress(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${dConfig.reqOptions.url}update/${dParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentDress = data.Dress;
																					
															res.render('forms/add_forms/dress_add' , { 'title': `Update Dress ${currentDress.title}` , 'eyons' : eyon , 'countries' : country , 'dress' : dress , 'errors' : errArr	});	});	}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${dConfig.reqOptions.url}${dParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/dress`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${dConfig.reqOptions.url}update/${dParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentDress = data.Dress;
																																																																																					clientErr.formAdd(err , errors);
																			
					res.render('forms/add_forms/dress_add' , { 'title': `Update Dress ${currentDress.title}` , 'eyons' : eyon , 'countries' : country , 'dress' : dress , 'errors' : errors });		})
																																																																																														return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});		}
      }]	, 

	'dressDelete' : (req , res , next) => {	dress = req.params.dress , url = `${dConfig.reqOptions.url}d/${dress}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/dress_delete' , {'title' : `Remove Dress ${data.title}` , 'dress' : data 	});		})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'dressDeleteSubmit' : (req , res , next) => {	dress = req.params.dress;

			axios({  	'method': 'delete' ,
																		  'url' : `${dConfig.reqOptions.url}${dress}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/dress');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});			});
	}

}