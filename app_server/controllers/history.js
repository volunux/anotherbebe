const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , History = require('../../app_api/models/history') , eConfig = require('../config/eyon') , hConfig = require('../config/history') , axios = require('axios') , 

url = '' ,  data = '' , ethnic = '' , history = '' , eyon = '' , hParam = '' , hUpdate = {} , hDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'historyAll' : (req , res , next) => { url = `${hConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('history/list_history' , { 'title': 'List of History' , 'historys' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'History entries not available' , 'error' : status 	})			});
	} ,

	'historyCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('history/list_country' , { 'title': 'List of History of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'historyEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('history/list_ethnic' , { 'title': 'List of History of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'historyCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${hConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} History`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('history/list_history' , { 'title' : title , 'historys' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'History entries not available' , 'error' : status 		})			});
	} ,	

	'historyEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${hConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} History`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('history/list_history' , { 'title' : title , 'historys' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'History entries not available' , 'error' : status 		})			});
	} ,	

	'historyDetail' : (req , res , next) => { 	history = req.params.history , url = `${hConfig.reqOptions.url}d/${history}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('history/history_detail' , { 'title' : title , 'history' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'History entry not available' , 'error' : status 	})			});
	} ,

	'historyAdd' : (req , res , next) => {	url = `${hConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/history_add' , { 'title': 'Add a new History' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'historyAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'History body cannot be empty and should be provided.')				.isLength({ 'min' : 1 })
																																																																.withMessage('History body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('History body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		history = new History(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${hConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/history_add' , { 'title': 'Add a new History'  , 'eyons' : eyon , 'countries' : country , 'history' : history , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : hConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/history/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${hConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
											res.render('forms/add_forms/history_add' , { 'title': 'Add a new History' , 'eyons' : eyon , 'countries' : country , 'history' : history , 'errors' : errors });		})
																																																																																															return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'historyUpdate' : (req , res , next) => {	history = req.params.history , url = `${hConfig.reqOptions.url}update/${history}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , history = data.History , country = data.Country;

			hUpdate['title'] = history.title;
																					res.render('forms/add_forms/history_add' , { 'title': `Update History ${hUpdate.title}` , 'eyons' : eyon , 'history' : history , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'historyUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'History body cannot be empty and should be provided.')				.isLength({ 'min' : 1 })
																																																																.withMessage('History body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('History body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	hParam = req.params.history;

				history = new History(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${hConfig.reqOptions.url}update/${hParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentHistory = data.History;

								res.render('forms/add_forms/history_add' , { 'title': `Update History ${currentHistory.title}` , 'eyons' : eyon , 'countries' : country , 'history' : history , 'errors' : errArr		});		});		}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${hConfig.reqOptions.url}${hParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/history`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${hConfig.reqOptions.url}update/${hParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentHistory = data.History;
																																																																																							clientErr.formAdd(err , errors);
																			
				res.render('forms/add_forms/history_add' , { 'title': `Update History ${currentHistory.title}` , 'eyons' : eyon , 'countries' : country , 'history' : history , 'errors' : errors });		})
																																																																																																		return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'historyDelete' : (req , res , next) => {	history = req.params.history , url = `${hConfig.reqOptions.url}d/${history}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/history_delete' , {'title' : `Remove History ${data.title}` , 'history' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'historyDeleteSubmit' : (req , res , next) => {	history = req.params.history;

			axios({  	'method': 'delete' ,
																		  'url' : `${hConfig.reqOptions.url}${history}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/history');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}