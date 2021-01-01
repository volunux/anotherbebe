const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Law = require('../../app_api/models/law') , eConfig = require('../config/eyon') , lConfig = require('../config/law') , 

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , law = '' , eyon = '' , lParam = '' , lUpdate = {} , lDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'lawAll' : (req , res , next) => { url = `${lConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('law/list_law' , { 'title': 'List of Law' , 'laws' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Law entries not available' , 'error' : status 	})			});
	} ,

	'lawCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('law/list_country' , { 'title': 'List of Law of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'lawEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('law/list_ethnic' , { 'title': 'List of Law of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'lawCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${lConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Laws`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('law/list_law' , { 'title' : title , 'laws' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Law entries not available' , 'error' : status 		})			});
	} ,	

	'lawEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${lConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Laws`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('law/list_law' , { 'title' : title , 'laws' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Law entries not available' , 'error' : status 		})			});
	} ,	

	'lawDetail' : (req , res , next) => { 	law = req.params.law , url = `${lConfig.reqOptions.url}d/${law}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('law/law_detail' , { 'title' : title , 'law' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Law entry not available' , 'error' : status 	})			});
	} ,

	'lawAdd' : (req , res , next) => {	url = `${lConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/law_add' , { 'title': 'Add a new Law' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'lawAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Law body cannot be empty and should be provided.')						.isLength({ 'min' : 1 })
																																																																.withMessage('Law body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Law body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		law = new Law(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${lConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/law_add' , { 'title': 'Add a new Law'  , 'eyons' : eyon , 'countries' : country , 'law' : law , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : lConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/law/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${lConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
																	res.render('forms/add_forms/law_add' , { 'title': 'Add a new Law' , 'eyons' : eyon , 'countries' : country , 'law' : law , 'errors' : errors });		})
																																																																																													return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}] , 

	'lawUpdate' : (req , res , next) => {	law = req.params.law , url = `${lConfig.reqOptions.url}update/${law}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , law = data.Law , country = data.Country;

			lUpdate['title'] = law.title;
																					res.render('forms/add_forms/law_add' , { 'title': `Update Law ${lUpdate.title}` , 'eyons' : eyon , 'law' : law , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'lawUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Law body cannot be empty and should be provided.')				.isLength({ 'min' : 1 })
																																																																.withMessage('Law body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Law body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	lParam = req.params.law;

				law = new Law(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${lConfig.reqOptions.url}update/${lParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentLaw = data.Law;

								res.render('forms/add_forms/law_add' , { 'title': `Update Law ${currentLaw.title}` , 'eyons' : eyon , 'countries' : country , 'law' : law , 'errors' : errArr		});		});		}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${lConfig.reqOptions.url}${lParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/law`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${lConfig.reqOptions.url}update/${lParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentLaw = data.Law;
																																																																																			clientErr.formAdd(err , errors);
																			
													res.render('forms/add_forms/law_add' , { 'title': `Update Law ${currentLaw.title}` , 'eyons' : eyon , 'countries' : country , 'law' : law , 'errors' : errors });		})
																																																																																																	return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'lawDelete' : (req , res , next) => {	law = req.params.law , url = `${lConfig.reqOptions.url}d/${law}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/law_delete' , {'title' : `Remove Law ${data.title}` , 'law' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'lawDeleteSubmit' : (req , res , next) => {	law = req.params.law;

			axios({  	'method': 'delete' ,
																		  'url' : `${lConfig.reqOptions.url}${law}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/law');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}