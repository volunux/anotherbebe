const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Life = require('../../app_api/models/life') , eConfig = require('../config/eyon') , lConfig = require('../config/life') , 

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , life = '' , eyon = '' , lParam = '' , lUpdate = {} , lDelete = '' , pConfig = require('../config/photo') , multer = require('multer') ,  

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'lifeAll' : (req , res , next) => { url = `${lConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('life/list_life' , { 'title': 'List of Life' , 'lifes' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Life entries not available' , 'error' : status 	})			});
	} ,

	'lifeCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('life/list_country' , { 'title': 'List of Life of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'lifeEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('life/list_ethnic' , { 'title': 'List of Life of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'lifeCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${lConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Life`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('life/list_life' , { 'title' : title , 'lifes' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Life entries not available' , 'error' : status 		})			});
	} ,	

	'lifeEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${lConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Life`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('life/list_life' , { 'title' : title , 'lifes' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Life entries not available' , 'error' : status 		})			});
	} ,	

	'lifeDetail' : (req , res , next) => { 	life = req.params.life , url = `${lConfig.reqOptions.url}d/${life}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('life/life_detail' , { 'title' : title , 'life' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Life entry not available' , 'error' : status 	})			});
	} ,

	'lifeAdd' : (req , res , next) => {	url = `${lConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/life_add' , { 'title': 'Add a new Life' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'lifeAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Life body cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																																.withMessage('Life body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Life body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		life = new Life(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${lConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/life_add' , { 'title': 'Add a new Life'  , 'eyons' : eyon , 'countries' : country , 'life' : life , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : lConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/life/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${lConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);

																res.render('forms/add_forms/life_add' , { 'title': 'Add a new Life' , 'eyons' : eyon , 'countries' : country , 'life' : life , 'errors' : errors });		})
																																																																																														return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}] , 

	'lifeUpdate' : (req , res , next) => {	life = req.params.life , url = `${lConfig.reqOptions.url}update/${life}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , life = data.Life , country = data.Country;

			lUpdate['title'] = life.title;
																					res.render('forms/add_forms/life_add' , { 'title': `Update Life ${lUpdate.title}` , 'eyons' : eyon , 'life' : life , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'lifeUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Life body cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																																.withMessage('Life body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Life body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	lParam = req.params.life;

				life = new Life(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${lConfig.reqOptions.url}update/${lParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentLife = data.Life;

								res.render('forms/add_forms/life_add' , { 'title': `Update Life ${currentLife.title}` , 'eyons' : eyon , 'countries' : country , 'life' : life , 'errors' : errArr		});		});		}
        						
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${lConfig.reqOptions.url}${lParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/life`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${lConfig.reqOptions.url}update/${lParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentLife = data.Life;
																																																																																				clientErr.formAdd(err , errors);

												res.render('forms/add_forms/life_add' , { 'title': `Update Life ${currentLife.title}` , 'eyons' : eyon , 'countries' : country , 'life' : life , 'errors' : errors });	})
																																																																																																		return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'lifeDelete' : (req , res , next) => {	life = req.params.life , url = `${lConfig.reqOptions.url}d/${life}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/life_delete' , {'title' : `Remove Life ${data.title}` , 'life' : data 	});			})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'lifeDeleteSubmit' : (req , res , next) => {	life = req.params.life;

			axios({  	'method': 'delete' ,
																		  'url' : `${lConfig.reqOptions.url}${life}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/life');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}