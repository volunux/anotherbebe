const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Religion = require('../../app_api/models/religion') , eConfig = require('../config/eyon') , rConfig = require('../config/religion') , 

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , religion = '' , eyon = '' , rParam = '' , rUpdate = {} , rDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'religionAll' : (req , res , next) => { url = `${rConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('religion/list_religion' , { 'title': 'List of Religion' , 'religions' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Religion entries not available' , 'error' : status 	})			});
	} ,

	'religionCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('religion/list_country' , { 'title': 'List of Religion of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'religionEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('religion/list_ethnic' , { 'title': 'List of Religion of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'religionCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${rConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Religion`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('religion/list_religion' , { 'title' : title , 'religions' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Religion entries not available' , 'error' : status 		})			});
	} ,	

	'religionEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${rConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Religion`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('religion/list_religion' , { 'title' : title , 'religions' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Religion entries not available' , 'error' : status 		})			});
	} ,	

	'religionDetail' : (req , res , next) => { 	religion = req.params.religion , url = `${rConfig.reqOptions.url}d/${religion}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('religion/religion_detail' , { 'title' : title , 'religion' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Religion entry not available' , 'error' : status 	})			});
	} ,

	'religionAdd' : (req , res , next) => {	url = `${rConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/religion_add' , { 'title': 'Add a new Religion' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'religionAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Religion body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Religion body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Religion body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		religion = new Religion(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${rConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

															res.render('forms/add_forms/religion_add' , { 'title': 'Add a new Religion'  , 'eyons' : eyon , 'countries' : country , 'religion' : religion , 'errors' : errArr 	});		})		}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : rConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/religion/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${rConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);

											res.render('forms/add_forms/religion_add' , { 'title': 'Add a new Religion' , 'eyons' : eyon , 'countries' : country , 'religion' : religion , 'errors' : errors });	})
																																																																																																return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}] , 

	'religionUpdate' : (req , res , next) => {	religion = req.params.religion , url = `${rConfig.reqOptions.url}update/${religion}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , religion = data.Religion , country = data.Country;

			rUpdate['title'] = religion.title;
																					res.render('forms/add_forms/religion_add' , { 'title': `Update Religion ${rUpdate.title}` , 'eyons' : eyon , 'religion' : religion , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'religionUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Religion body cannot be empty and should be provided.')			.isLength({ 'min' : 1 })
																																																																.withMessage('Religion body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Religion body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	rParam = req.params.religion;

				religion = new Religion(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${rConfig.reqOptions.url}update/${rParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentReligion = data.Religion;

					res.render('forms/add_forms/religion_add' , { 'title': `Update Religion ${currentReligion.title}` , 'eyons' : eyon , 'countries' : country , 'religion' : religion , 'errors' : errArr	});		});	}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${rConfig.reqOptions.url}${rParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/religion`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${rConfig.reqOptions.url}update/${rParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentReligion = data.Religion;
																																																																																								clientErr.formAdd(err , errors);

		res.render('forms/add_forms/religion_add' , { 'title': `Update Religion ${currentReligion.title}` , 'eyons' : eyon , 'countries' : country , 'religion' : religion , 'errors' : errors });		})

																																																																																																	return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
   }]	, 

	'religionDelete' : (req , res , next) => {	religion = req.params.religion , url = `${rConfig.reqOptions.url}d/${religion}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/religion_delete' , {'title' : `Remove Religion ${data.title}` , 'religion' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'religionDeleteSubmit' : (req , res , next) => {	religion = req.params.religion;

			axios({  	'method': 'delete' ,
																		  'url' : `${rConfig.reqOptions.url}${religion}`})

			.then((response) => {	req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/religion');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});				});
	}

}