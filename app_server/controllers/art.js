const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

const Art = require('../../app_api/models/models').Art;

var eConfig = require('../config/eyon') , cConfig = require('../config/country') , pConfig = require('../config/photo') , aConfig = require('../config/art') , axios = require('axios') , 

errHandler = require('./helpers/compiledError') , url = '' , data = '' , ethnic = '' , art = '' , eyon = '' , aParam = '' ,  

country = '' , century = '' , region = '' , continent = '' , errors = '' , errArr = '' , modelType = 'Art' , modelTypes = 'Arts';

module.exports = {

	'entryAll' : (req , res , next) => { url = `${aConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('art/list_art' , { 'title': `List of ${modelTypes}` , 'arts' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	})			});
	} ,

	'entryCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('art/list_country' , { 'title': `List of ${modelTypes} of Countries` , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `Country entries not available.` , 'error' : status 	})					});
	} ,

	'entryEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('art/list_ethnic' , { 'title': `List of ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `Ethnic Group entries not available.` , 'error' : status 	})				});
	} ,

	'entryCountry' : (req , res , next) => { country = req.params.country , url = `${aConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('art/list_art' , { 'title' : title , 'arts' : data });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 		})			});
	} ,	

	'entryEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = `${aConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('art/list_art' , { 'title' : title , 'arts' : data 	 });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 		})			});
	} ,	

	'entryDetail' : (req , res , next) => { 	art = req.params.art , url = `${aConfig.reqOptions.url}d/${art}` , finalP = res.locals.breadcrumb.pop().url;

			axios.get(url).then((response) => {	data = response.data , title = data.title , finalB = {
																																																	'label' : title ,

																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);
																																															res.render('art/art_detail' , { 'title' : title , 'art' : data 	});				})
										.catch((err) => {			status = err.response;
																																															res.render('error' , {'title' : `${modelType} entry not available.` , 'error' : status 	})			});
	} ,

	'artAdd' : (req , res , next) => {	url = `${aConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {		data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

																																res.render('forms/add_forms/art_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 

																																																					'continents' : continent , 'regions' : region , 'centuries' : century ,	'rmethod' : 'POST' });		})
										.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'artAddSubmit' :  [ 

			body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 2 })
																																																															.withMessage(`Title cannot be less than 3 character in length.`)
																																																		.isLength({ 'max' : 150})
																																																															.withMessage(`Title cannot be greater than 150 characters in length.`) ,
			body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
			body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

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
			body('main_body'						, 	`${modelType} body should be provided and cannot be empty.`)	.isLength({ 'min' : 1 })
																																																															.withMessage(`${modelType} body cannot be less than 1 character in length.`)
																																																		.isLength({ 'max' : 6000})
																																																															.withMessage(`${modelType} body cannot be greater than 6000 characters in length.`) ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {		art = new Art(req.body);

					console.log(art);

				errors = validationResult(req);

				errArr = errors.array();

								if (errArr.length != 0) {	url = `${aConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

							res.render('forms/add_forms/art_add' , { 'title': `Add a new ${modelType}`  , 'eyons' : eyon , 'countries' : country , 'art' : art , 

																											 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errArr , 'rmethod' : 'POST'		});		})			}											
						else {
										axios({  	'method': 'post' ,
																									'url' : aConfig.reqOptions.url ,
																																										'data' : req.body 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/art/${data.slug}`);		})
														.catch((err) => { errors = [];
																														if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}add`;

			return axios.get(url).then((response) => { 	data = response.data ,	eyon = data.Eyon , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century;

																																																																		errHandler.formAdd(err , errors);
																
					return res.render('forms/add_forms/art_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 'art' : art , 

																										 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errors , 'rmethod' : 'POST'});		})			}
			
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 		});				});			}
	}], 

	'artUpdate' : (req , res , next) => {	art = req.params.art , url = `${aConfig.reqOptions.url}update/${art}` , finalP = res.locals.breadcrumb.pop().url;

		axios.get(url).then((response) => { 	data = response.data , eyon = data.Eyon , art = data.Art , country = data.Country , continent = data.Continent , region = data.Region , century = data.Century ,

																					current = art , finalB = {
																																			'label' : current.title ,

																																			'url' : finalP		};
		res.locals.breadcrumb.push(finalB);

		res.locals.breadcrumb.splice(2 , 1);
																								res.render('forms/add_forms/art_add' , { 'title': `Update ${modelType} ${current.title}` , 'eyons' : eyon , 'countries' : country , 'art' : art ,

																																													'continents' : continent , 'regions' : region , 'centuries' : century , 'rmethod' : 'PUT' });	})
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'artUpdateSubmit' : [

			body('title'								,		'Title should be provided and cannot be empty.')							.isLength({ 'min' : 2 })
																																																															.withMessage(`Title cannot be less than 3 character in length.`)
																																																		.isLength({ 'max' : 150})
																																																															.withMessage(`Title cannot be greater than 150 characters in length.`) ,
			body('ethnic_group'					, 	'An Ethnic Group should be provided and cannot be empty.')		.isLength({ 'min' : 1 }) 

																																																		.isLength({ 'max' : 40})
																																																														.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
			body('country'							, 	'A Country should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

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
			body('main_body'						, 	`${modelType} body should be provided and cannot be empty.`)	.isLength({ 'min' : 1 })
																																																															.withMessage(`${modelType} body cannot be less than 1 character in length.`)
																																																		.isLength({ 'max' : 6000})
																																																															.withMessage(`${modelType} body cannot be greater than 6000 characters in length.`) ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	aParam = req.params.art;

				art = new Art(req.body);

				errors = validationResult(req);
	
				errArr = errors.array();

								if (errArr.length !== 0) {		url = `${aConfig.reqOptions.url}update/${aParam}`;

			axios.get(url).then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , current = data.Art , continent = data.Continent , region = data.Region , century = data.Century;

					res.render('forms/add_forms/art_add' , { 'title': `Update ${modelType} ${current.title}` , 'eyons' : eyon , 'countries' : country , 'art' : art , 

																									 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errArr	, 'rmethod' : 'PUT'	});		});		}
					else {
									axios({  	'method': 'put' ,
																							'url' : `${aConfig.reqOptions.url}${aParam}` ,
																																															'data' : req.body 	})
									.then((response) => {		data = response.data;
																																				req.flash('info', 'Entry successfully updated.');
																																																													res.redirect(`/update/art`);		})
									.catch((err) => {	 errors = [];
																									if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}update/${aParam}`;
																															
	return axios.get(url).then((response) => { data = response.data , eyon = data.Eyon , country = data.Country , currentArt = data.Art , continent = data.Continent , region = data.Region , century = data.Century;

																																																																															errHandler.formAdd(err , errors);
		return res.render('forms/add_forms/art_add' , { 'title': `Update ${modelType} ${current.title}` , 'eyons' : eyon , 'countries' : country , 'art' : art , 

																									 'continents' : continent , 'regions' : region , 'centuries' : century , 'errors' : errors , 'rmethod' : 'PUT' });		});			}

																							status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});		});			}
		 }]	, 

	'artDelete' : (req , res , next) => {	art = req.params.art , url = `${aConfig.reqOptions.url}d/${art}` , finalP = res.locals.breadcrumb.pop().url;
		
		axios.get(url).then((response) => { 	data = response.data , finalB = {
																																						'label' : data.title ,

																																						'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																																										res.render('forms/delete_forms/art_delete' , {'title' : `Remove Art ${data.title}` , 'art' : data 	});					})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'artDeleteSubmit' : (req , res , next) => {	art = req.params.art;

			axios({  	'method': 'delete' ,
																			'url' : `${aConfig.reqOptions.url}${art}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/art');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 				});								});
	} ,

	'entryVote' : (req , res , next) => {	art = req.params.art;

			axios({  	'method': 'post' ,
																		'url' : `${aConfig.reqOptions.url}d/${art}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/art/${data}`)		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryComment' : (req , res , next) => { var art = req.params.art , url = `${aConfig.reqOptions.url}d/${art}/comment`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comments , breadcrumb = res.locals.breadcrumb , finalB = breadcrumb[breadcrumb.length - 2];

																																		res.locals.breadcrumb[breadcrumb.length - 2] = {
																																																											'label' : data.art.title ,

																																																											'url' : finalB.url };

																																		res.render('comment/art_comment' , {'title' : data.art.title , 'comments' : comment , 'art' : art})		})
													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryCommentDetail' : (req , res , next) => { var art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb.pop() , finalB = breadcrumb[breadcrumb.length - 2] , 

				finalC = res.locals.breadcrumb[2]; 
																												res.locals.breadcrumb[res.locals.breadcrumb.length - 2] = {
																																																											'label' : data.art.title ,

																																																											'url' : finalC.url };

																																		res.render('comment/comment_detail' , {'title' : data.art.title , 'comment' : comment , 'art' : art})		})
													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryAddComment' : (req , res , next) => {	 art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/add`;

				axios.get(url)
												.then((response) => { data = response.data , breadcrumb = res.locals.breadcrumb , finalC = breadcrumb[breadcrumb.length - 3].url;

																																		res.locals.breadcrumb[breadcrumb.length - 3] = {
																																																											'label' : data.title ,

																																																											'url' : finalC };

																																		res.render('forms/add_forms/comment_add' , {'title' : data.title })		})
													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddCommentSubmit' : [

			body('text' , 'Comment body should be provided and cannot be empty.')		.isLength({ 'min' : 5 })
																																																				.withMessage('Comment body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Comment body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , art = req.params.art , url = `${aConfig.reqOptions.url}d/${art}/comment/add`;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {

				axios.get(url)
												.then((response) => { data = response.data , breadcrumb = res.locals.breadcrumb , finalB = breadcrumb[breadcrumb.length - 3];

																																		res.locals.breadcrumb[breadcrumb.length - 3] = {
																																																											'label' : data.title ,

																																																											'url' : finalB.url };

																																	res.render('forms/add_forms/comment_add' , {'title' : data.title , 'errors' : errArr , 'comment' : comment })		})
												.catch((err) => {	status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${art}/comment` ,
																					  															 																'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/art/${art}/comment`);		})
														.catch((err) => {	status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryCommentUpdate' : (req , res , next) => { art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/update`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

				axios.get(url)
											.then((response) => { data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.art.title ,

																																																									'url' : finalB.url };

																																res.render('forms/add_forms/comment_add' , {'title' : `Update Comment ${data.art.title}` , 'comment' : data });		})
									.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryCommentUpdateSubmit' : [

			body('text' , 'Comment body should be provided cannot be empty.')			.isLength({ 'min' : 5 })
																																																			.withMessage('Comment body cannot be less than 5 characters in length.')
																																						.isLength({ 'max' : 700 })
																																																			.withMessage('Comment body cannot be greater than 700 characters in length.')	,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , art = req.params.art , cParam = req.params.comment;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {
																	res.render('forms/add_forms/comment_add' , {'title' : 'Update Comment' , 'errors' : errArr , 'comment' : comment });
				}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${art}/comment/d/${cParam}` ,
																					  															 																						'data' : comment 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/art/${art}/comment`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}d/${art}/comment/${cParam}/update`;
	return axios.get(url)
												.then((response) => { data = response.data , finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

																																		errHandler.formAdd(err , errors);

																																						res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																												
																																																													'label' : data.art.title ,

																																																													'url' : finalB.url };
															
						return res.render('forms/add_forms/comment_add' , { 'title': `Update Comment ${data.art.title}` , 'comment' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			}); 	 	}

																						status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryCommentDelete' : (req , res , next) => {	art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/delete`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.art.title ,

																																																									'url' : finalB.url };

																																		res.render('forms/delete_forms/comment_delete' , {'title' : `Remove Comment ${data.art.title}` , 'comment' : data 	});			})
									.catch((err) => {				status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryCommentDeleteSubmit' : (req , res , next) => {	art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/art/${art}`);
																																								/*res.redirect('/delete/art');*/		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	} ,

	'entryAddReply' : (req , res , next) => {	 art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/add`;

																							finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);

																							console.log('Request Received');
				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb;

																																		res.locals.breadcrumb[2] = {
																																																'label' : data.art.title ,

																																																'url' : finalB.url };

																																		res.render('forms/add_forms/helpers/reply_add' , {'title' : `Add Reply ${data.art.title}` , 'comment' : comment })		})
													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddReplySubmit' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 5 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/add`;

															finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb , res.locals.breadcrumb[2] = {
																																																																																'label' : data.art.title ,

																																																																																'url' : finalB.url };

																					res.render('forms/add_forms/helpers/reply_add' , {'title' : `Add Reply ${data.art.title}` , 'comment' : comment , 'errors' : errArr , 'reply' : reply  })		})
						
						.catch((err) => {	status = err.response;
																					
																					res.render('error' , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply` ,
																					  															 																										'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/art/${art}/comment`);		})
														.catch((err) => {	status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyUpdate' : (req , res , next) => { 	art = req.params.art , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${reply}/update`;
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data.art.title ,

																																																																			'url' : finalB.url };

																																res.render('forms/add_forms/helpers/reply_add' , {'title' : `Update Reply ${data.art.title}` , 'reply' : data  , 'comment' : comment 	});		})
									.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryReplyUpdateSubmit' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 5 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , art = req.params.art , comment = req.params.comment , rParam = req.params.reply;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {		url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${rParam}/update` , finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data.art.title ,

																																																																			'url' : finalB.url };

																			res.render('forms/add_forms/helpers/reply_add' , {'title' : `Update Reply ${data.art.title}` , 'errors' : errArr  , 'comment' : comment , 'reply' : reply	});		})

									.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});		}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${rParam}` ,
																					  																									 																						'data' : reply 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/art/${art}/reply`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${rParam}/update` ,

																																																			finalB = res.locals.breadcrumb[2] ,	breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		return	axios.get(url)
													.then((response) => { data = response.data , comment = data.comment;
																																																	res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																					
																																																																						'label' : data.art.title ,

																																																																						'url' : finalB.url };
																																		errHandler.formAdd(err , errors);
															
					return res.render('forms/add_forms/reply_add' , { 'title': `Update Reply ${data.art.title}` , 'comment' : comment , 'reply' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			}); 	 	}

																						status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyDelete' : (req , res , next) => {	art = req.params.art , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${reply}/delete`;
		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.art.title ,

																																																									'url' : finalB.url };

																																		res.render('forms/delete_forms/helpers/reply_delete' , {'title' : `Remove Reply ${data.art.title}` , 'reply' : data 	});			})
									.catch((err) => {				status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryReplyDeleteSubmit' : (req , res , next) => {	art = req.params.art , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${art}/comment/d/${comment}/reply/d/${reply}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/art/${art}/comment`);
																																								/*res.redirect('/delete/art');*/		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	} ,

	'signedUrl' : (req , res , next) => {

			params = {

					'Bucket' : 'aremi-arts-art' ,

					'Fields' : {
												'key' : myFile.renameFile(req.query.filename) ,

												'acl' : 'public-read-write' ,

												'Content-Type' : req.query.contentType ,

												'success_action_status' : '201' ,					} ,

					'Conditions' : [

														{'bucket' : 'aremi-arts-art'} ,

														{'acl' : 'public-read-write'} ,

														{'success_action_status' : '201'} ,

														['starts-with' , '$Content-Type' , ''] 		] 
								}

				s3.createPresignedPost(params , (err , data) => {
																													if (err) {
																																			console.log(err)				
																														} else {
																																				res.status(200).json({data});
																																		}
																									})
																}

}