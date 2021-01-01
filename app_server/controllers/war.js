const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , War = require('../../app_api/models/war') , eConfig = require('../config/eyon') , wConfig = require('../config/war') , axios = require('axios') , url = '' , 

data = '' , ethnic = '' , war = '' , eyon = '' , wParam = '' , wUpdate = {} , wDelete = '' , pConfig = require('../config/photo') , multer = require('multer') , upload = multer({ 'storage' : pConfig.multer }) , 

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'warAll' : (req , res , next) => { url = `${wConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('war/list_war' , { 'title': 'List of Wars' , 'wars' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'War entries not available' , 'error' : status 	})			});
	} ,

	'warCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('war/list_country' , { 'title': 'List of War of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'warEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('war/list_ethnic' , { 'title': 'List of War of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'warCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${wConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Wars`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('war/list_war' , { 'title' : title , 'wars' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'War entries not available' , 'error' : status 		})			});
	} ,	

	'warEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${wConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Wars`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('war/list_war' , { 'title' : title , 'wars' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'War entries not available' , 'error' : status 		})			});
	} ,	

	'warDetail' : (req , res , next) => { 	war = req.params.war , url = `${wConfig.reqOptions.url}d/${war}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('war/war_detail' , { 'title' : title , 'war' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'War entry not available' , 'error' : status 	})			});
	} ,

	'warAdd' : (req , res , next) => {	url = `${wConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/war_add' , { 'title': 'Add a new War' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'warAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'War body cannot be empty and should be provided.')						.isLength({ 'min' : 1 })
																																																																.withMessage('War body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('War body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		war = new War(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${wConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/war_add' , { 'title': 'Add a new War'  , 'eyons' : eyon , 'countries' : country , 'war' : war , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : wConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/war/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${wConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
																	res.render('forms/add_forms/war_add' , { 'title': 'Add a new War' , 'eyons' : eyon , 'countries' : country , 'war' : war , 'errors' : errors });		})
																																																																																													return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'warUpdate' : (req , res , next) => {	war = req.params.war , url = `${wConfig.reqOptions.url}update/${war}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , war = data.War , country = data.Country;

			wUpdate['title'] = war.title;
																					res.render('forms/add_forms/war_add' , { 'title': `Update War ${wUpdate.title}` , 'eyons' : eyon , 'war' : war , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'warUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'War body cannot be empty and should be provided.')						.isLength({ 'min' : 1 })
																																																																.withMessage('War body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('War body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	wParam = req.params.war;

				war = new War(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${wConfig.reqOptions.url}update/${wParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentWar = data.War;

																	res.render('forms/add_forms/war_add' , { 'title': `Update War ${currentWar.title}` , 'eyons' : eyon , 'countries' : country , 'war' : war , 'errors' : errArr		});		});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${wConfig.reqOptions.url}${wParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/war`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${wConfig.reqOptions.url}update/${wParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentWar = data.War;
																																																																																			clientErr.formAdd(err , errors);
																			
											res.render('forms/add_forms/war_add' , { 'title': `Update War ${currentWar.title}` , 'eyons' : eyon , 'countries' : country , 'war' : war , 'errors' : errors });		})
																																																																																															return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'warDelete' : (req , res , next) => {	war = req.params.war , url = `${wConfig.reqOptions.url}d/${war}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/war_delete' , {'title' : `Remove War ${data.title}` , 'war' : data 	});					})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'warDeleteSubmit' : (req , res , next) => {	war = req.params.war;

			axios({  	'method': 'delete' ,
																		  'url' : `${wConfig.reqOptions.url}${war}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/war');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}