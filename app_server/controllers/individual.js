const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Individual = require('../../app_api/models/individual') , eConfig = require('../config/eyon') , iConfig = require('../config/individual') , 

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , individual = '' , eyon = '' , iParam = '' , iUpdate = {} , iDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'individualAll' : (req , res , next) => { url = `${iConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('individual/list_individual' , { 'title': 'List of Individual' , 'individuals' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Individual entries not available' , 'error' : status 	})			});
	} ,

	'individualCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('individual/list_country' , { 'title': 'List of Individual of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'individualEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('individual/list_ethnic' , { 'title': 'List of Individual of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'individualCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${iConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Individuals`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('individual/list_individual' , { 'title' : title , 'individuals' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Individual entries not available' , 'error' : status 		})			});
	} ,	

	'individualEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${iConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Individuals`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('individual/list_individual' , { 'title' : title , 'individuals' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Individual entries not available' , 'error' : status 		})			});
	} ,	

	'individualDetail' : (req , res , next) => { 	individual = req.params.individual , url = `${iConfig.reqOptions.url}d/${individual}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('individual/individual_detail' , { 'title' : title , 'individual' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Individual entry not available' , 'error' : status 	})			});
	} ,

	'individualAdd' : (req , res , next) => {	url = `${iConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/individual_add' , { 'title': 'Add a new Individual' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'individualAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Individual body cannot be empty and should be provided.')		.isLength({ 'min' : 1 })
																																																																.withMessage('Individual body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Individual body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		individual = new Individual(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${iConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/individual_add' , { 'title': 'Add a new Individual'  , 'eyons' : eyon , 'countries' : country , 'individual' : individual , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : iConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/individual/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${iConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
						res.render('forms/add_forms/individual_add' , { 'title': 'Add a new Individual' , 'eyons' : eyon , 'countries' : country , 'individual' : individual , 'errors' : errors });		})
																																																																																																return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'individualUpdate' : (req , res , next) => {	individual = req.params.individual , url = `${iConfig.reqOptions.url}update/${individual}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , individual = data.Individual , country = data.Country;

			iUpdate['title'] = individual.title;
																					res.render('forms/add_forms/individual_add' , { 'title': `Update Individual ${iUpdate.title}` , 'eyons' : eyon , 'individual' : individual , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'individualUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Individual body cannot be empty and should be provided.')				.isLength({ 'min' : 1 })
																																																																.withMessage('Individual body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Individual body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	iParam = req.params.individual;

				individual = new Individual(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${iConfig.reqOptions.url}update/${iParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentIndividual = data.Individual;

								res.render('forms/add_forms/individual_add' , { 'title': `Update Individual ${currentIndividual.title}` , 'eyons' : eyon , 'countries' : country , 'individual' : individual , 'errors' : errArr		});		});		}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${iConfig.reqOptions.url}${iParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/individual`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${iConfig.reqOptions.url}update/${iParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentIndividual = data.Individual;
																																																																																							clientErr.formAdd(err , errors);
																			
				res.render('forms/add_forms/individual_add' , { 'title': `Update Individual ${currentIndividual.title}` , 'eyons' : eyon , 'countries' : country , 'individual' : individual , 'errors' : errors });		})
																																																																																																		return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'individualDelete' : (req , res , next) => {	individual = req.params.individual , url = `${iConfig.reqOptions.url}d/${individual}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/individual_delete' , {'title' : `Remove Individual ${data.title}` , 'individual' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'individualDeleteSubmit' : (req , res , next) => {	individual = req.params.individual;

			axios({  	'method': 'delete' ,
																		  'url' : `${iConfig.reqOptions.url}${individual}`})
			
			.then((response) => {	req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/individual');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}