const { body , validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

const errHandler = require('./helpers/compiledError');

const axios = require('axios');

const multer = require('multer');

const eConfig = require('../config/eyon');

const cConfig = require('../config/country');

const Book = require('../../app_api/models/models').Book;

var bConfig = require('../config/book') , errors = '' , errArr = '' , bUpdate = {} , url = '' , data = '' , ethnic = '' , book = '' , eyon = '' , bParam = '' , current = '' , finalP = {} , finalB = {} ,

breadcrumb = '' , upload = multer({ 'storage' : bConfig.mConfig }) , modelType = 'Book' , modelTypes = 'Books';

module.exports = {

	'entryAll' : (req , res , next) => {  url = bConfig.reqOptions.url;

			axios.get(url)
										.then((response) => { data = response.data;
																																				res.render('book/list_book' , { 'title': `List of ${modelTypes}` , 'books' : data });						})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});				});
	} ,

	'entryEthnicList' : (req , res , next) => {  url = `${bConfig.reqOptions.url}ethnic/list`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('book/list_ethnic' , { 'title': `List of ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `Ethnic Group entries not available.` , 'error' : status 	});			});
	} ,

	'entryCountryList' : (req , res , next) => {  url = `${bConfig.reqOptions.url}country/list`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('book/list_country' , { 'title': `List of ${modelTypes} of Countries` , 'countries' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : `Country entries not available.` , 'error' : status 	});					});
	} ,

	'entryEthnic' : (req , res , next) => { ethnic = req.params.ethnic , url = `${bConfig.reqOptions.url}ethnic/${ethnic}` , title = `List of ${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('book/list_book' , { 'title' : title , 'books' : data });				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.pop();
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});						});
	} ,	

	'entryCountry' : (req , res , next) => { country = req.params.country , url = `${bConfig.reqOptions.url}country/${country}` , title = `List of ${country[0].toUpperCase()}${country.slice(1)} ${modelTypes}`;

			axios.get(url)
										.then((response) => {	data = response.data;
																																				res.render('book/list_book' , { 'title' : title , 'books' : data });				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.pop();
																																				res.render('error' , {'title' : `${modelType} entries not available.` , 'error' : status 	});				});
	} ,	

	'entryDetail' : (req , res , next) => { 	book = req.params.book , url = `${bConfig.reqOptions.url}d/${book}` , finalP = res.locals.breadcrumb.pop().url;

			axios.get(url)
										.then((response) => {	data = response.data , title = data.title , finalB = {
																																																	'label' : title ,

																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);
																																				res.render('book/book_detail' , { 'title' : title , 'book' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : `${modelType} entry not available.` , 'error' : status 	});				});
	} ,

	'entryAdd' : (req , res , next) => {	url = `${bConfig.reqOptions.url}add`;	

		axios.get(url)
									.then((response) => {	data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;

																																res.render('forms/add_forms/book_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																																					'continents' : continent , 'centuries' : century , 'genres' : genre , 'rmethod' : 'POST' });			})
									.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryAddSubmit' :  [ 	

				upload.single('cover_image') ,

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
				body('summary'				, 	'Summary of Book should be provided and cannot be empty.')	.isLength({ 'min' : 9 })
																																																												.withMessage('Summary of Book cannot be less than 10 characters in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('Summar of Book cannot be greater than 2000 characters in length.') ,
				body('book_owner'				, 	'Book Owner should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Author of Book cannot be greater than 40 characters in length.') ,
				body('Isbn'							, 	'Isbn should be provided and cannot be empty.')						.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Findspot of Book cannot be greater than 40 characters in length.') ,
				body('Publisher'				, 	'Publisher should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Medium of Book or Object cannot be greater than 40 characters in length.') ,
				body('page_number'			, 	'Page Number should be provided and cannot be empty.')		.isLength({ 'min' : 1 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Credit of Book cannot be greater than 40 characters in length.') ,
				sanitizeBody('*').trim() ,

				bConfig.checkFileUpload , bConfig.validate , bConfig.checkFileSize , bConfig.addFileUpload ,
				
				(req , res , next) => {	book = new Book(req.body);

				 errors = validationResult(req);

				 errArr = errors.array();
																						if (req.body.error2) {	errArr.push(req.body.error2);		}

																						if (req.body.error3) {	errArr.push(req.body.error3);		}

																						if (req.body.error7) {	errArr.push(req.body.error7);		}

				if (errArr.length != 0) {			if (req.file) { 
																												bConfig.delete(req , errArr); 	}
					url = `${bConfig.reqOptions.url}add`;	

				axios.get(url)
											.then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;
														
																						res.render('forms/add_forms/book_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon ,	'countries' : country , 'regions' : region , 'continents' : continent , 

																															 												 'centuries' : century , 'genres' : genre , 'book' : book , 'errors' : errArr , 'rmethod' : 'POST'		});				})
											.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status}) });		}
				else {
								axios({  	'method': 'post' ,
																				  		'url' : bConfig.reqOptions.url ,
								  															 																'data' : req.body 	})
												.then((response) => {		data = response.data;
																																							res.redirect(`/book/${data.slug}`);		})
												.catch((err) => {		errors = [];
																													if (err.response.status == 400) { url = `${bConfig.reqOptions.url}add`;
	return axios.get(url)
												.then((response) => { data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;
																																																				
																																																				errHandler.formAdd(err , errors);

												return res.render('forms/add_forms/book_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,

																							 																	 'centuries' : century , 'genres' : genre , 'book' : book , 'errors' : errors , 'rmethod' : 'POST'		});			}); 	 }		
																						status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 		});		});			}
	}] , 

	'entryUpdate' : (req , res , next) => {	book = req.params.book , url = `${bConfig.reqOptions.url}update/${book}` , finalP = res.locals.breadcrumb.pop().url;

		axios.get(url)
									.then((response) => {	 data = response.data , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,

																				 century = data.Century , genre = data.Genre , book = data.Book , current = book , finalB = {
																																																																					'label' : current.title ,

																																																																					'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																										res.render('forms/add_forms/book_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																					 										'continents' : continent , 'centuries' : century , 'genres' : genre , 'book' : book , 'rmethod' : 'PUT' });		})
									.catch((err) => {	status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryUpdateSubmit' : [

				upload.single('book') ,

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
				body('about'							, 	'About Book should be provided and cannot be empty.')	.isLength({ 'min' : 9 })
																																																												.withMessage('About Book cannot be less than 10 characters in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('About Book cannot be greater than 2000 characters in length.') ,

				body('artist')																																				.isLength({ 'min' : 0 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Author of Book cannot be greater than 40 characters in length.') ,
				body('findspot')																																			.isLength({ 'min' : 0 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Findspot of Book cannot be greater than 40 characters in length.') ,
				body('medium')																																				.isLength({ 'min' : 0 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Medium of Book or Object cannot be greater than 40 characters in length.') ,
				body('credit')																																				.isLength({ 'min' : 0 })

																																															.isLength({ 'max' : 40 })
																																																												.withMessage('Credit of Book cannot be greater than 40 characters in length.') ,
				body('dimension')																																			.isLength({ 'min' : 0 })

																																															.isLength({ 'max' : 200 })
																																																												.withMessage('Dimension of Book cannot be greater than 200 characters in length.') ,
				sanitizeBody('*').trim() ,

				bConfig.validate , bConfig.checkFileSize , bConfig.addFileUpload ,
				
				(req , res , next) => { bParam = req.params.book , book = new Book(req.body);

					errors = validationResult(req);

					errArr = errors.array();
																			if (req.body.error3) {	errArr.push(req.body.error3);		}

																			if (req.body.error7) {	errArr.push(req.body.error7);		}

						if (errArr.length != 0) {		if (req.file) {
																												bConfig.delete(req , errArr);	}

								url = `${bConfig.reqOptions.url}update/${bParam}` , finalP = res.locals.breadcrumb.pop().url;

					axios.get(url)
												.then((response) => { data = response.data ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																							century = data.Century , continent = data.Continent , region = data.Region , current = data.Book , finalB = {
																																																																																	'label' : current.title ,

																																																																																	'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
										
									res.render('forms/add_forms/book_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																   
																														 'centuries' : century , 'genres' : genre , 'book' : book , 'errors' : errArr , 'rmethod' : 'PUT'		});		})
										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
					else {
									axios({  	'method': 'put' ,
																						  'url' : `${bConfig.reqOptions.url}${bParam}` , 
																		  																 												'data' : req.body 	})
									.then((response) => {		data = response.data;
																																	req.flash('info', 'Entry successfully updated.');
																																																										res.redirect(`/update/book`);		})
									.catch((err) => {		errors = [];
																										if (err.response.status == 400) { 	url = `${bConfig.reqOptions.url}update/${bParam}` , finalP = res.locals.breadcrumb.pop().url;
			return axios.get(url)
														.then((response) => { data = response.data ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																							
																							century = data.Century , genre = data.Genre , current = data.Book , finalB = {
																																																																		'label' : current.title ,

																																																																		'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb.splice(2 , 1);
																																																												errHandler.formAdd(err , errors);
															
							return	res.render('forms/add_forms/book_add' , { 'title': `Update ${modelType} : ${current.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																   
																														 'centuries' : century , 'genres' : genre , 'book' : book , 'errors' : errors , 'rmethod' : 'PUT' 	});			});  }
																status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});				}
 }]	, 

	'entryDelete' : (req , res , next) => {	book = req.params.book , url = `${bConfig.reqOptions.url}delete/${book}` , finalP = res.locals.breadcrumb.pop().url;
		
		axios.get(url)
									.then((response) => { 	data = response.data , finalB = {
																																						'label' : data.title ,

																																						'url' : finalP		};
				res.locals.breadcrumb.push(finalB);

				res.locals.breadcrumb[2]['url'] = '/book';
																																		res.render('forms/delete_forms/book_delete' , {'title' : `Remove ${modelType} : ${data.title}` , 'book' : data 	});			})
									.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryDeleteSubmit' : (req , res , next) => {	book = req.params.book;

			axios({  	'method': 'delete' ,
																		  'url' : `${bConfig.reqOptions.url}${book}`})

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/book');		})
			.catch((err) => {		status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	}
	
}