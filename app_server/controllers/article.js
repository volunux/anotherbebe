const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

module.exports = function(modelName , lModelName) {

const $Model = require('../../app_api/models/models')[modelName];

var eConfig = require('../config/eyon') , cConfig = require('../config/country') , aConfig = require(`../config/${lModelName}`) , axios = require('axios') , 

errHandler = require('./helpers/compiledError') , url = '' , data = '' , ethnic = '' , article =  '' , eyon = '' , aParam = '' ,  

country = '' , century = '' , region = '' , continent = '' , errors = '' , errArr = '' , modelType = modelName , modelTypes = `${modelName}s` , lModelType = lModelName , lModelTypes = `${lModelName}s`;

return {

	'entryAll' : (req , res , next) => { url = `${aConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render(`${lModelType}/list_${lModelType}` , { 'title': `List of ${modelTypes}` , [lModelName + 's'] : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render(`error` , {'title' : `${modelType} entries not available.` , 'error' : status 	})			});
	} ,

	'entryCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render(`${lModelType}/list_country` , { 'title': `List of ${modelTypes} of Countries` , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render(`error` , {'title' : `Country entries not available.` , 'error' : status 	})					});
	} ,

	'entryEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render(`${lModelType}/list_ethnic` , { 'title': `List of ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render(`error` , {'title' : `Ethnic Group entries not available.` , 'error' : status 	})				});
	} ,

	'entryCountry' : (req , res , next) => { country = req.params.country , url = `${aConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render(`${lModelType}/list_${lModelType}` , { 'title' : title , [lModelName + 's'] : data });				})
										.catch((err) => {				status = err.response;

											res.locals.breadcrumb.splice(3);
																																				res.render(`error` , {'title' : `${modelType} entries not available.` , 'error' : status 		})			});
	} ,	

	'entryEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = `${aConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render(`${lModelType}/list_${lModelType}` , { 'title' : title , [lModelName + 's'] : data 	 });				})
										.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(3);
																																				res.render(`error` , {'title' : `${modelType} entries not available.` , 'error' : status 		})			});
	} ,	

	'entryDetail' : (req , res , next) => { 	article =  req.params.article , url = `${aConfig.reqOptions.url}d/${article}` , finalP = res.locals.breadcrumb.pop().url;

			axios.get(url).then((response) => {	data = response.data , title = data.title , finalB = {
																																																	'label' : title ,

																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);
																																															res.render(`${lModelType}/${lModelType}_detail` , { 'title' : title , [lModelType] : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render(`error` , {'title' : `${modelType} entry not available.` , 'error' : status 	})			});
	} ,

	'entryAdd' : (req , res , next) => {	url = `${aConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

																																res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 

																																																					'continents' : continent , 'regions' : region , 'centuries' : century ,	'rmethod' : 'POST' });		})
										.catch((err) => {		status = err.response;
																																res.render(`error` , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'entryAddSubmit' :  [ 

			body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 2 })
																																																															.withMessage(`Title cannot be less than 3 character in length.`)
																																																		.isLength({ 'max' : 150})
																																																															.withMessage(`Title cannot be greater than 150 characters in length.`) ,
			body('ethnic_group'					, 	'Ethnic Group should be provided and cannot be empty.')				.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
			body('country'							, 	'Country should be provided and cannot be empty.')						.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Country cannot be greater than 40 characters in length.`) ,
			body('century'							,		'Century should be provided and cannot be empty.')						.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Century cannot be greater than 40 characters in length.`) ,
			body('continent'						,		'Continent should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
			body('region'								,		'Region should be provided and cannot be empty.')							.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Region cannot be greater than 40 characters in length.`) ,
			body('main_body'						, 	`${modelType} body should be provided and cannot be empty.`)	.isLength({ 'min' : 9 })
																																																															.withMessage(`${modelType} body cannot be less than 10 character in length.`)
																																																		.isLength({ 'max' : 6000})
																																																															.withMessage(`${modelType} body cannot be greater than 6000 characters in length.`) ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		article =  new $Model(req.body);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${aConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

							res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , [lModelType] : article , 

																											 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errArr , 'rmethod' : 'POST'		});		})

										.catch((err) => {	status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
						else {
										axios({  	'method': 'post' ,
																									'url' : aConfig.reqOptions.url ,
																																										'data' : req.body 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/${lModelType}/${data.slug}`);		})
														.catch((err) => { errors = [];
																														if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}add`;

			return axios.get(url)
														.then((response) => { 	data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

																																																																		errHandler.formAdd(err , errors);
																
					return res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , [lModelType] : article , 

																										 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errors , 'rmethod' : 'POST'});		})

														.catch((err) => {	status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status})	});		}

																													status = err.response;
																																										res.render(`error` , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'entryUpdate' : (req , res , next) => {	article =  req.params.article , url = `${aConfig.reqOptions.url}update/${article}` , finalP = res.locals.breadcrumb.pop().url;

	axios.get(url).then((response) => { 	data = response.data , eyon = data.Eyon , article =  data[modelType] , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century ,

																					current = article , finalB = {
																																					'label' : current.title ,

																																					'url' : finalP		};
		res.locals.breadcrumb.push(finalB);

		res.locals.breadcrumb.splice(2 , 1);
																					res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , [lModelType] : article ,

																																														'continents' : continent , 'regions' : region , 'centuries' : century , 'rmethod' : 'PUT' });	})
									.catch((err) => {				status = err.response;
																																	res.render(`error` , {'title' : 'Error' , 'error' : status})	});
	} , 

	'entryUpdateSubmit' : [

			body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 2 })
																																																															.withMessage(`Title cannot be less than 3 character in length.`)
																																																		.isLength({ 'max' : 150})
																																																															.withMessage(`Title cannot be greater than 150 characters in length.`) ,
			body('ethnic_group'					, 	'Ethnic Group should be provided and cannot be empty.')				.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
			body('country'							, 	'Country should be provided and cannot be empty.')						.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Country cannot be greater than 40 characters in length.`) ,
			body('century'							,		'Century should be provided and cannot be empty.')						.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Century cannot be greater than 40 characters in length.`) ,
			body('continent'						,		'Continent should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
			body('region'								,		'Region should be provided and cannot be empty.')							.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Region cannot be greater than 40 characters in length.`) ,
			body('main_body'						, 	`${modelType} body should be provided and cannot be empty.`)	.isLength({ 'min' : 9 })
																																																															.withMessage(`${modelType} body cannot be less than 10 character in length.`)
																																																		.isLength({ 'max' : 6000})
																																																															.withMessage(`${modelType} body cannot be greater than 6000 characters in length.`) ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	aParam = req.params.article;

				article =  new $Model(req.body);

				errors = validationResult(req);
	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${aConfig.reqOptions.url}update/${aParam}`;

			axios.get(url).then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , current = data[modelType] , continent = data.Continent , region = data.Region , century = data.Century;

					res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , [lModelType] : article , 

																									 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errArr	, 'rmethod' : 'PUT'	});		})

										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
					else {
									axios({  	'method': 'put' ,
																							'url' : `${aConfig.reqOptions.url}${aParam}` ,
																																															'data' : req.body 	})
									.then((response) => {		data = response.data;
																																	req.flash('info', 'Entry successfully updated.');
																																																										res.redirect(`/update/${lModelType}`);		})
									.catch((err) => {	 errors = [];
																									if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}update/${aParam}`;
																															
	return axios.get(url).then((response) => { data = response.data , eyon = data.Eyon , country = data.Country , current = data[modelType] , continent = data.Continent , region = data.Region , century = data.Century;

																																																																															errHandler.formAdd(err , errors);

		return res.render(`forms/add_forms/${lModelType}_add` , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , [lModelType] : article , 

																									 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errors , 'rmethod' : 'PUT' });		})

										.catch((err) => {	status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});			}
																			status = err.response;
																																res.render(`error` , {'title' : 'Error' , 'error' : status 	});		});			}
		 }]	, 

	'entryDelete' : (req , res , next) => {	article =  req.params.article , url = `${aConfig.reqOptions.url}d/${article}` , finalP = res.locals.breadcrumb.pop().url;
		
		axios.get(url).then((response) => { 	data = response.data , finalB = {
																																						'label' : data.title ,

																																						'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																																				res.render(`forms/delete_forms/${lModelType}_delete` , {'title' : `Remove Art : ${data.title}` , [lModelType] : data 	});			})
									.catch((err) => {				status = err.response;
																																				res.render(`error` , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'entryDeleteSubmit' : (req , res , next) => {	article =  req.params.article;

			axios({  	'method': 'delete' ,
																			'url' : `${aConfig.reqOptions.url}${article}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/delete/${lModelType}`);		})
			.catch((err) => {			status = err.response;
																														res.render(`error` , {'title' : 'Error' , 'error' : status 				});					});
	}


}

}