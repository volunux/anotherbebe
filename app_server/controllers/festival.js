const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Festival = require('../../app_api/models/festival') , eConfig = require('../config/eyon') , fConfig = require('../config/festival') , axios = require('axios') ,

url = '' , data = '' , ethnic = '' , festival = '' , eyon = '' , fParam = '' , fUpdate = {} , fDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,

upload = multer({ 'storage' : pConfig.multer }) , clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'festivalAll' : (req , res , next) => { url = `${fConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('festival/list_festival' , { 'title': 'List of Festivals' , 'festivals' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Festival entries not available' , 'error' : status 	})						});
	} ,

	'festivalCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('festival/list_country' , { 'title': 'List of Festival of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})				});
	} ,

	'festivalEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('festival/list_ethnic' , { 'title': 'List of Festival of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'festivalCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${fConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Festivals`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('festival/list_festival' , { 'title' : title , 'festivals' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Festival entries not available' , 'error' : status 		})						});
	} ,	

	'festivalEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${fConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Festivals`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('festival/list_festival' , { 'title' : title , 'festivals' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Festival entries not available' , 'error' : status 		})			});
	} ,	

	'festivalDetail' : (req , res , next) => { 	festival = req.params.festival , url = `${fConfig.reqOptions.url}d/${festival}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('festival/festival_detail' , { 'title' : title , 'festival' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Festival entry not available' , 'error' : status 	})			});
	} ,

	'festivalAdd' : (req , res , next) => {	url = `${fConfig.reqOptions.url}add`;	

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/festival_add' , { 'title': 'Add a new Festival' , 'eyon' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'festivalAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Festival body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Festival body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Festival body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		festival = new Festival(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${fConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/festival_add' , { 'title': 'Add a new Festival' , 'eyons' : eyon , 'countries' : country , 'festival' : festival , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : fConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/festival/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
									res.render('forms/add_forms/festival_add' , { 'title': 'Add a new Festival' , 'eyons' : eyon , 'countries' : country , 'festival' : festival , 'errors' : errors });		})
																																																																																															return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});			});			}																																																	
	}], 

	'festivalUpdate' : (req , res , next) => {	festival = req.params.festival , url = `${fConfig.reqOptions.url}update/${festival}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , festival = data.Festival , country = data.Country;

			fUpdate['title'] = festival.title;
																					res.render('forms/add_forms/festival_add' , { 'title': `Update ${fUpdate.title}` , 'eyon' : eyon , 'festival' : festival , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'festivalUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Festival body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Festival body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Festival body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	fParam = req.params.festival;

				festival = new Festival(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${fConfig.reqOptions.url}update/${fParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFestival = data.Festival;
																					
						res.render('forms/add_forms/festival_add' , { 'title': `Update Festival ${currentFestival.title}` , 'eyons' : eyon , 'countries' : country , 'festival' : festival , 'errors' : errArr		});		});		}
        							
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${fConfig.reqOptions.url}${fParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/festival`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}update/${fParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFestival = data.Festival;
																																																																																								clientErr.formAdd(err , errors);
																			
					res.render('forms/add_forms/festival_add' , { 'title': `Update Festival ${currentFestival.title}` , 'eyons' : eyon , 'countries' : country , 'festival' : festival , 'errors' : errors });	})
																																																																																																			return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});		}
    }]	, 

	'festivalDelete' : (req , res , next) => {	festival = req.params.festival , url = `${fConfig.reqOptions.url}d/${festival}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;

																																										res.render('forms/delete_forms/festival_delete' , {'title' : `Remove Festival ${data.title}` , 'festival' : data 	});				})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'festivalDeleteSubmit' : (req , res , next) => {	festival = req.params.festival;

			axios({  	'method': 'delete' ,
																		  'url' : `${fConfig.reqOptions.url}${festival}`})

			.then((response) => {	req.flash('info', 'Entry successfully deleted.');
																																							res.redirect('/delete/festival');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});																										});
	}

}