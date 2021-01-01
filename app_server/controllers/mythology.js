const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Mythology = require('../../app_api/models/mythology') , eConfig = require('../config/eyon') , mConfig = require('../config/mythology') , 

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , mythology = '' , eyon = '' , mParam = '' , mUpdate = {} , mDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'mythologyAll' : (req , res , next) => { url = `${mConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('mythology/list_mythology' , { 'title': 'List of Mythology' , 'mythologys' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Mythology entries not available' , 'error' : status 	})			});
	} ,

	'mythologyCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('mythology/list_country' , { 'title': 'List of Mythology of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'mythologyEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('mythology/list_ethnic' , { 'title': 'List of Mythology of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'mythologyCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${mConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Mythology`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('mythology/list_mythology' , { 'title' : title , 'mythologys' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Mythology entries not available' , 'error' : status 		})			});
	} ,	

	'mythologyEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${mConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Mythology`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('mythology/list_mythology' , { 'title' : title , 'mythologys' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Mythology entries not available' , 'error' : status 		})			});
	} ,	

	'mythologyDetail' : (req , res , next) => { 	mythology = req.params.mythology , url = `${mConfig.reqOptions.url}d/${mythology}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('mythology/mythology_detail' , { 'title' : title , 'mythology' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Mythology entry not available' , 'error' : status 	})			});
	} ,

	'mythologyAdd' : (req , res , next) => {	url = `${mConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/mythology_add' , { 'title': 'Add a new Mythology' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'mythologyAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Mythology body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Mythology body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Mythology body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		mythology = new Mythology(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${mConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

															res.render('forms/add_forms/mythology_add' , { 'title': 'Add a new Mythology'  , 'eyons' : eyon , 'countries' : country , 'mythology' : mythology , 'errors' : errArr 	});		})		}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : mConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/mythology/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${mConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);

											res.render('forms/add_forms/mythology_add' , { 'title': 'Add a new Mythology' , 'eyons' : eyon , 'countries' : country , 'mythology' : mythology , 'errors' : errors });	})
																																																																																																	return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}] , 

	'mythologyUpdate' : (req , res , next) => {	mythology = req.params.mythology , url = `${mConfig.reqOptions.url}update/${mythology}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , mythology = data.Mythology , country = data.Country;

			mUpdate['title'] = mythology.title;
																					res.render('forms/add_forms/mythology_add' , { 'title': `Update Mythology ${mUpdate.title}` , 'eyons' : eyon , 'mythology' : mythology , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'mythologyUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Mythology body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Mythology body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Mythology body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	mParam = req.params.mythology;

				mythology = new Mythology(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${mConfig.reqOptions.url}update/${mParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentMythology = data.Mythology;

					res.render('forms/add_forms/mythology_add' , { 'title': `Update Mythology ${currentMythology.title}` , 'eyons' : eyon , 'countries' : country , 'mythology' : mythology , 'errors' : errArr	});		});	}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${mConfig.reqOptions.url}${mParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/mythology`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${mConfig.reqOptions.url}update/${mParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentMythology = data.Mythology;
																																																																																									clientErr.formAdd(err , errors);

		res.render('forms/add_forms/mythology_add' , { 'title': `Update Mythology ${currentMythology.title}` , 'eyons' : eyon , 'countries' : country , 'mythology' : mythology , 'errors' : errors });		})

																																																																																																	return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
   }]	, 

	'mythologyDelete' : (req , res , next) => {	mythology = req.params.mythology , url = `${mConfig.reqOptions.url}d/${mythology}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/mythology_delete' , {'title' : `Remove Mythology ${data.title}` , 'mythology' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'mythologyDeleteSubmit' : (req , res , next) => {	mythology = req.params.mythology;

			axios({  	'method': 'delete' ,
																		  'url' : `${mConfig.reqOptions.url}${mythology}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/mythology');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});				});
	}

}