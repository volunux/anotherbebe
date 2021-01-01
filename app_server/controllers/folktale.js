const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Folktale = require('../../app_api/models/folktale') , eConfig = require('../config/eyon') , fConfig = require('../config/folktale') , axios = require('axios') ,

url = '' , data = '' , ethnic = '' , folktale = '' , eyon = '' , fParam = '' , fUpdate = {} , fDelete = '' , pConfig = require('../config/photo') , multer = require('multer') , 

upload = multer({ 'storage' : pConfig.multer }) , clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'folktaleAll' : (req , res , next) => { url = `${fConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('folktale/list_folktale' , { 'title': 'List of Folktales' , 'folktales' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Folktale entries not available' , 'error' : status 	})						});
	} ,

	'folktaleCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('folktale/list_country' , { 'title': 'List of Folktale of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})							});
	} ,

	'folktaleEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('folktale/list_ethnic' , { 'title': 'List of Folktale of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})							});
	} ,

	'folktaleCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${fConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Folktales`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('folktale/list_folktale' , { 'title' : title , 'folktales' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Folktale entries not available' , 'error' : status 		})						});
	} ,	

	'folktaleEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${fConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Folktales`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('folktale/list_folktale' , { 'title' : title , 'folktales' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Folktale entries not available' , 'error' : status 		})			});
	} ,	

	'folktaleDetail' : (req , res , next) => { 	folktale = req.params.folktale , url = `${fConfig.reqOptions.url}d/${folktale}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('folktale/folktale_detail' , { 'title' : title , 'folktale' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Folktale entry not available' , 'error' : status 	})			});
	} ,

	'folktaleAdd' : (req , res , next) => {	url = `${fConfig.reqOptions.url}add`;	

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/folktale_add' , { 'title': 'Add a new Folktale ' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'folktaleAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Folktale body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Folktale body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Folktale body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		folktale = new Folktale(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${fConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/folktale_add' , { 'title': 'Add a new Folktale' , 'eyons' : eyon , 'countries' : country , 'folktale' : folktale , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : fConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {	data = response.data.status;		
																																													res.redirect(`/folktale/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
							res.render('forms/add_forms/folktale_add' , { 'title': 'Add a new Folktale' , 'eyons' : eyon , 'countries' : country , 'folktale' : folktale , 'errors' : errors });		})
																																																																																													return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}																																																	
	}] , 

	'folktaleUpdate' : (req , res , next) => {	folktale = req.params.folktale , url = `${fConfig.reqOptions.url}update/${folktale}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , folktale = data.Folktale , country = data.Country;

			fUpdate['title'] = folktale.title;
																					res.render('forms/add_forms/folktale_add' , { 'title': `Update ${fUpdate.title}` , 'eyons' : eyon , 'folktale' : folktale , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'folktaleUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Folktale body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Folktale body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Folktale body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	fParam = req.params.folktale;

				folktale = new Folktale(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${fConfig.reqOptions.url}update/${fParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFolktale = data.Folktale;

						res.render('forms/add_forms/folktale_add' , { 'title': `Update Folktale ${currentFolktale.title}` , 'eyons' : eyon , 'countries' : country , 'folktale' : folktale , 'errors' : errArr		});		});		}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${fConfig.reqOptions.url}${fParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/folktale`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}update/${fParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFolktale = data.Folktale;
																																																																																								clientErr.formAdd(err , errors);

				res.render('forms/add_forms/folktale_add' , { 'title': `Update Folktale ${currentFolktale.title}` , 'eyons' : eyon , 'countries' : country , 'folktale' : folktale , 'errors' : errors });	})
																																																																																																		return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});		}
     }]	, 

	'folktaleDelete' : (req , res , next) => {	folktale = req.params.folktale , url = `${fConfig.reqOptions.url}d/${folktale}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																							res.render('forms/delete_forms/folktale_delete' , {'title' : `Remove Folktale ${data.title}` , 'folktale' : data 	});					})
									.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'folktaleDeleteSubmit' : (req , res , next) => {	folktale = req.params.folktale;

			axios({  	'method': 'delete' ,
																		  'url' : `${fConfig.reqOptions.url}${folktale}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/folktale');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});																										});
	}

}