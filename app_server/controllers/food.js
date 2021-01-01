const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Food = require('../../app_api/models/food') , eConfig = require('../config/eyon') , fConfig = require('../config/food') , axios = require('axios') , url = '' , 

data = '' , ethnic = '' , food = '' , eyon = '' , fParam = '' , fUpdate = {} , fDelete = '' , pConfig = require('../config/photo') , multer = require('multer') , upload = multer({ 'storage' : pConfig.multer }) , 

clientErr = require('./helpers/compiledError') , cConfig = require('../config/country') , country = '' , countries = '' , errors = '' , errArr = '';

module.exports = {

	'foodAll' : (req , res , next) => { url = `${fConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('food/list_food' , { 'title': 'List of Foods' , 'foods' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Food entries not available' , 'error' : status 	})			});
	} ,

	'foodCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('food/list_country' , { 'title': 'List of Foods of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'foodEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('food/list_ethnic' , { 'title': 'List of Foods of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'foodCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${fConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Foods`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('food/list_food' , { 'title' : title , 'foods' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Food entries not available' , 'error' : status 		})			});
	} ,	

	'foodEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${fConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Foods`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('food/list_food' , { 'title' : title , 'foods' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Food entries not available' , 'error' : status 		})			});
	} ,	

	'foodDetail' : (req , res , next) => { 	food = req.params.food , url = `${fConfig.reqOptions.url}d/${food}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('food/food_detail' , { 'title' : title , 'food' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : 'Food entry not available' , 'error' : status 	})			});
	} ,

	'foodAdd' : (req , res , next) => {	url = `${fConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																																							res.render('forms/add_forms/food_add' , { 'title': 'Add a new Food' , 'eyons' : eyon , 'countries' : country });		})
										.catch((err) => {				status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'foodAddSubmit' :  [ 

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Food body cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																																.withMessage('Food body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Food body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		food = new Food(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${fConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon , country = data.Country;

																	res.render('forms/add_forms/food_add' , { 'title': 'Add a new Food'  , 'eyons' : eyon , 'countries' : country , 'food' : food , 'errors' : errArr 		});		})			}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : fConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;
																																														res.redirect(`/food/${data.url}`);		})
																			.catch((err) => { errors = [];
																																			if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country;
																																																																							clientErr.formAdd(err , errors);
																					
																	res.render('forms/add_forms/food_add' , { 'title': 'Add a new Food' , 'eyons' : eyon , 'countries' : country , 'food' : food , 'errors' : errors });		})
																																																																																															return false;	}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'foodUpdate' : (req , res , next) => {	food = req.params.food , url = `${fConfig.reqOptions.url}update/${food}`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , food = data.Food , country = data.Country;

			fUpdate['title'] = food.title;
																					res.render('forms/add_forms/food_add' , { 'title': `Update Food ${fUpdate.title}` , 'eyons' : eyon , 'food' : food , 'countries' : country });	})
										
									.catch((err) => {				status = err.response; 
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'foodUpdateSubmit' : [

				body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 1 })
																																																															.withMessage('Title cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 120})
																																																															.withMessage('Title cannot be greater than 120 characters in length.')
																																																			.trim() ,

				body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }).trim() ,

				body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 }).trim() ,

				body('main_body'						, 	'Food body cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																																.withMessage('Food body cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 6000})
																																																																.withMessage('Food body cannot be greater than 6000 characters in length.')
																																																			.trim().escape() ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	fParam = req.params.food;

				food = new Food(req.body);

				errors = validationResult(req);
 	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${fConfig.reqOptions.url}update/${fParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFood = data.Food;

															res.render('forms/add_forms/food_add' , { 'title': `Update Food ${currentFood.title}` , 'eyons' : eyon , 'countries' : country , 'food' : food , 'errors' : errArr		});		});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${fConfig.reqOptions.url}${fParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/food`);		})
															.catch((err) => {	 errors = [];
																															if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${fConfig.reqOptions.url}update/${fParam}`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon , country = data.Country , currentFood = data.Food;
																																																																																			clientErr.formAdd(err , errors);
																			
									res.render('forms/add_forms/food_add' , { 'title': `Update Food ${currentFood.title}` , 'eyons' : eyon , 'countries' : country , 'food' : food , 'errors' : errors });		})
																																																																																																return false;		}
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
     }]	, 

	'foodDelete' : (req , res , next) => {	food = req.params.food , url = `${fConfig.reqOptions.url}d/${food}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																										res.render('forms/delete_forms/food_delete' , {'title' : `Remove Food ${data.title}` , 'food' : data 	});					})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'foodDeleteSubmit' : (req , res , next) => {	food = req.params.food;

			axios({  	'method': 'delete' ,
																		  'url' : `${fConfig.reqOptions.url}${food}`})

			.then((response) => {	req.flash('info', 'Entry successfully deleted.');
																																							res.redirect('/delete/food');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	}

}