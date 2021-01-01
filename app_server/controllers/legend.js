const { body , validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

const errHandler = require('./helpers/compiledError');

const axios = require('axios');

const multer = require('multer');

const eConfig = require('../config/eyon');

const cConfig = require('../config/country');

const Legend = require('../../app_api/models/models').Legend;

var lConfig = require('../config/legend') , errors = '' , errArr = '' , pUpdate = {} , url = '' , data = '' , ethnic = '' , legend = '' , eyon = '' , lParam = '' , current = '' , finalP = {} , finalB = {} ,

comment = '' , breadcrumb = '' , cParam = '' , upload = multer({ 'storage' : lConfig.mConfig }) , modelType = 'Legend' , modelTypes = 'Legends';

module.exports = {

	'entryAll' : (req , res , next) => {  url = lConfig.reqOptions.url;

			axios.get(url)
										.then((response) => { data = response.data;
																																				res.render('legend/list_legend' , { 'title': `List of ${modelTypes}` , 'legends' : data });						})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});				});
	} ,

	'entryEthnicList' : (req , res , next) => {  url = `${lConfig.reqOptions.url}ethnic/list`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('legend/list_ethnic' , { 'title': `List of ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `Ethnic Group entries not available.` , 'error' : status 	});			});
	} ,

	'entryCountryList' : (req , res , next) => {  url = `${lConfig.reqOptions.url}country/list`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('legend/list_country' , { 'title': `List of ${modelTypes} of Countries` , 'countries' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `Country entries not available.` , 'error' : status 	});					});
	} ,

	'entryEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = `${lConfig.reqOptions.url}ethnic/${ethnic}` , title = `List of ${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('legend/list_legend' , { 'title' : title , 'legends' : data });				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.pop();
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});						});
	} ,	

	'entryCountry' : (req , res , next) => { country = req.params.country , url = `${lConfig.reqOptions.url}country/${country}` , title = `List of ${country[0].toUpperCase()}${country.slice(1)} ${modelTypes}`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('legend/list_legend' , { 'title' : title , 'legends' : data });				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.pop();
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});				});
	} ,	

	'entryDetail' : (req , res , next) => { 	legend = req.params.legend , url = `${lConfig.reqOptions.url}d/${legend}` , finalP = res.locals.breadcrumb.pop().url;

			axios.get(url)
										.then((response) => {	data = response.data , title = data.title , finalB = {
																																																	'label' : title ,

																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);
																																				res.render('legend/legend_detail' , { 'title' : title , 'legend' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `${modelType} entry not available.` , 'error' : status 	});				});
	} ,

	'entryAdd' : (req , res , next) => {	url = `${lConfig.reqOptions.url}add`;	

		axios.get(url)
									.then((response) => {	data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;

																																res.render('forms/add_forms/legend_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																																					'continents' : continent , 'centuries' : century , 'genres' : genre , 'rmethod' : 'POST' });			})
									.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryAddSubmit' :  [ 	

				upload.single('photo') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 2 })
																																																												.withMessage('Title cannot be less than 3 characters in length.')
																																															.isLength({ 'max' : 150 })
																																																												.withMessage('Title cannot be greater than 150 characters in length.') ,
				body('date'								,		'Date should be provided and cannot be empty.')					.isLength({ 'min' : 3 })
																																																												.withMessage('Date cannot be less than 4 characters in length.')
																																															.isLength({ 'max' : 15 })
																																																												.withMessage('Date cannot be greater than 15 characters in length.') ,
				body('century'						,		'Century should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Century cannot be greater than 40 characters in length.`) ,
				body('genre'							,		'Category should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Category cannot be greater than 40 characters in length.`) ,
				body('country'						,		'Country should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Country cannot be greater than 40 characters in length.`) ,
				body('continent'					,		'Continent should be provided and cannot be empty.')		.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							,		'Region should be provided and cannot be empty.')				.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('ethnic_group'				, 	'Ethnic Group should be provided and cannot be empty.')	.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('legend_body'				, 	'Legend body should be provided and cannot be empty.')	.isLength({ 'min' : 9 })
																																																												.withMessage('Legend body cannot be less than 10 characters in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('Legend body cannot be greater than 2000 characters in length.') ,
				sanitizeBody('*').trim() ,

				lConfig.checkFileUpload , lConfig.validate , lConfig.checkFileSize , lConfig.addFileUpload ,
				
				(req , res , next) => {	legend = new Legend(req.body);

					console.log(legend);

				 errors = validationResult(req);

				 errArr = errors.array();
																						if (req.body.error2) {	errArr.push(req.body.error2);		}

																						if (req.body.error3) {	errArr.push(req.body.error3);		}

																						if (req.body.error7) {	errArr.push(req.body.error7);		}

				if (errArr.length != 0) {			if (req.file) { 
																												lConfig.delete(req , errArr); 	}
					url = `${lConfig.reqOptions.url}add`;	

				axios.get(url)
											.then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;
														
																						res.render('forms/add_forms/legend_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon ,	'countries' : country , 'regions' : region , 'continents' : continent , 

																															 												 'centuries' : century , 'genres' : genre , 'legend' : legend , 'errors' : errArr , 'rmethod' : 'POST'		});				})
											.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status}) });		}
				else {
								axios({  	'method': 'post' ,
																				  		'url' : lConfig.reqOptions.url ,
								  															 																'data' : req.body 	})
												.then((response) => {		data = response.data;
																																							res.redirect(`/legend/${data.slug}`);		})
												.catch((err) => {		errors = [];
																													if (err.response.status == 400) { url = `${lConfig.reqOptions.url}add`;
	return axios.get(url)
												.then((response) => { data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;
																																																				
																																																				errHandler.formAdd(err , errors);

												return res.render('forms/add_forms/legend_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,

																							 																	 'centuries' : century , 'genres' : genre , 'legend' : legend , 'errors' : errors , 'rmethod' : 'POST'		});			}); 	 }		
																						status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 		});		});			}
	}] , 

	'entryUpdate' : (req , res , next) => {	legend = req.params.legend , url = `${lConfig.reqOptions.url}update/${legend}` , finalP = res.locals.breadcrumb.pop().url;

		axios.get(url)
									.then((response) => {	 data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,

																				 century = data.Century , genre = data.Genre , legend = data.Legend , current = legend , finalB = {
																																																																					'label' : current.title ,

																																																																					'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																										res.render('forms/add_forms/legend_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																					 										'continents' : continent , 'centuries' : century , 'genres' : genre , 'legend' : legend , 'rmethod' : 'PUT' });		})
									.catch((err) => {	status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryUpdateSubmit' : [

				upload.single('photo') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 2 })
																																																												.withMessage('Title cannot be less than 3 characters in length.')
																																															.isLength({ 'max' : 150 })
																																																												.withMessage('Title cannot be greater than 150 characters in length.') ,
				body('date'								,		'Date should be provided and cannot be empty.')					.isLength({ 'min' : 3 })
																																																												.withMessage('Date cannot be less than 4 characters in length.')
																																															.isLength({ 'max' : 15 })
																																																												.withMessage('Date cannot be greater than 15 characters in length.') ,
				body('century'						,		'Century should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Century cannot be greater than 40 characters in length.`) ,
				body('genre'							,		'Category should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Category cannot be greater than 40 characters in length.`) ,
				body('country'						,		'Country should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Country cannot be greater than 40 characters in length.`) ,
				body('continent'					,		'Continent should be provided and cannot be empty.')		.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							,		'Region should be provided and cannot be empty.')				.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('ethnic_group'				, 	'Ethnic Group should be provided and cannot be empty.')	.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40})
																																																												.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('legend_body'				, 	'Legend body should be provided and cannot be empty.')	.isLength({ 'min' : 9 })
																																																												.withMessage('Legend body cannot be less than 10 characters in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('Legend body cannot be greater than 2000 characters in length.') ,
				sanitizeBody('*').trim() ,

				lConfig.validate , lConfig.checkFileSize , lConfig.addFileUpload ,
				
				(req , res , next) => { lParam = req.params.legend;

					legend = new Legend(req.body);

					errors = validationResult(req);

					errArr = errors.array();
																			if (req.body.error3) {	errArr.push(req.body.error3);		}

																			if (req.body.error7) {	errArr.push(req.body.error7);		}

						if (errArr.length != 0) {		if (req.file) {
																												lConfig.delete(req , errArr);	}

								url = `${lConfig.reqOptions.url}update/${lParam}` , finalP = res.locals.breadcrumb.pop().url;

					axios.get(url)
												.then((response) => { data = response.data ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																							century = data.Century , continent = data.Continent , region = data.Region , current = data.Legend , finalB = {
																																																																																	'label' : current.title ,

																																																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
										
									res.render('forms/add_forms/legend_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																   
																														 'centuries' : century , 'genres' : genre , 'legend' : legend , 'errors' : errArr , 'rmethod' : 'PUT'		});		})
										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
					else {
									axios({  	'method': 'put' ,
																						  'url' : `${lConfig.reqOptions.url}${lParam}` , 
																		  																 												'data' : req.body 	})
									.then((response) => {		data = response.data;
																																	req.flash('info', 'Entry successfully updated.');
																																																										res.redirect(`/update/legend`);		})
									.catch((err) => {		errors = [];
																										if (err.response.status == 400) { 	url = `${lConfig.reqOptions.url}update/${lParam}` , finalP = res.locals.breadcrumb.pop().url;
			return axios.get(url)
														.then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																							
																							century = data.Century , genre = data.Genre , current = data.Legend , finalB = {
																																																																		'label' : current.title ,

																																																																		'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																																																												errHandler.formAdd(err , errors);
															
							return	res.render('forms/add_forms/legend_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																   
																														 'centuries' : century , 'genres' : genre , 'legend' : legend , 'errors' : errors , 'rmethod' : 'PUT' 	});			});  }
																status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});				}
 }]	, 

	'entryDelete' : (req , res , next) => {	legend = req.params.legend , url = `${lConfig.reqOptions.url}delete/${legend}` , finalP = res.locals.breadcrumb.pop().url;
		
		axios.get(url)
									.then((response) => { 	data = response.data , finalB = {
																																						'label' : data.title ,

																																						'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb[2]['url'] = '/legend';
																																		res.render('forms/delete_forms/legend_delete' , {'title' : `Remove ${modelType} : ${data.title}` , 'legend' : data 	});			})
									.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryDeleteSubmit' : (req , res , next) => {	legend = req.params.legend;

			axios({  	'method': 'delete' ,
																		  'url' : `${lConfig.reqOptions.url}${legend}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/legend');		})
			.catch((err) => {		status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	}
	
}