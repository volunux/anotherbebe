const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Sound = require('../../app_api/models/sound') , eConfig = require('../config/eyon') , sConfig = require('../config/sound') , errors = '' , sUpdate = {} ,

cConfig = require('../config/country') , axios = require('axios') , url = '' , data = '' , ethnic = '' , sound = '' , eyon = '' , sParam = '' , multer = require('multer') ,

upload = multer({ 'storage' : sConfig.mConfig }) ,  clientErr = require('./helpers/compiledError') , errArr = '';

module.exports = {

	'soundAll' : (req , res , next) => {  url = `${sConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('sound/list_sound' , { 'title': 'List of Sounds' , 'sounds' : data });				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Sound entries not available' , 'error' : status 	})						});
	} ,

	'soundCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('sound/list_country' , { 'title': 'List of Sounds of Countries' , 'countries' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})			});
	} ,

	'soundEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('sound/list_ethnic' , { 'title': 'List of Sounds of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})			});
	} ,

	'soundEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${sConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Sounds`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('sound/list_sound' , { 'title' : title , 'sounds' : data , 'ethnic' : ethnic });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Sound entries not available' , 'error' : status 	})						});
	} ,	

	'soundCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${sConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Sounds`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('sound/list_sound' , { 'title' : title , 'sounds' : data });				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Sound entries not available' , 'error' : status 	})				});
	} ,	

	'soundDetail' : (req , res , next) => { 	sound = req.params.sound , url = `${sConfig.reqOptions.url}d/${sound}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;
																																															res.render('sound/sound_detail' , { 'title' : title , 'sound' : data 	});				})
									.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Sound entry not available' , 'error' : status 	})					});
	} ,

	'soundAdd' : (req , res , next) => {	url = `${sConfig.reqOptions.url}add`;	

		axios.get(url).then((response) => {	data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;

																												res.render('forms/add_forms/sound_add' , { 'title': 'Add a new Sound' , 'eyons' : eyon , 'countries' : country , 'regions' : region , 

																																																		'continents' : continent , 'centuries' : century , 'genres' : genre , 'rmethod' : 'POST'	});			})										
								.catch((err) => {	status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} , 

	'soundAddSubmit' :  [ 	

				upload.single('sound') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 1 })
																																																												.withMessage('Title cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 120 })
																																																												.withMessage('Title cannot be greater than 120 characters in length.')
																																															.trim() ,

				body('date'								,		'Date should be provided and cannot be empty.')					.isLength({ 'min' : 1 })
																																																												.withMessage('Date cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 10 })
																																																												.withMessage('Date cannot be greater than 10 characters in length.')
																																															.trim() ,

				body('century'						,		'Century should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('genre'							,		'Category should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('country'						,		'Country should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('continent'					,		'Continent should be provided and cannot be empty.')		.isLength({ 'min' : 3 }).trim() ,
				body('ethnic_group'				, 	'Ethnic Group should be provided and cannot be empty.')	.isLength({ 'min' : 3 }).trim() ,

				body('about'							, 	'About sound should be provided and cannot be empty.')	.isLength({ 'min' : 1 })
																																																												.withMessage('About Sound cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('About Sound cannot be greater than 2000 characters in length.')
																																															.trim().escape() ,
				sanitizeBody('*').trim() ,

				sConfig.checkFileUpload , sConfig.validate , sConfig.addFileUpload ,
				
				(req , res , next) => {	sound = new Sound(req.body);

				 errors = validationResult(req);

				 errArr = errors.array();
																						if (req.body.error2) {	errArr.push(req.body.error2);		}

																						if (req.body.error3) {	errArr.push(req.body.error3);		}
								
								if (errArr.length != 0) {			if (req.file && req.body.error3) { 
																																									sConfig.delete(req , errArr); }
									url = `${sConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , 

																													continent = data.Continent , century = data.Century , genre = data.Genre;
																					
																	res.render('forms/add_forms/sound_add' , { 'title': 'Add a new Sound' , 'eyons' : eyon ,	'countries' : country , 'regions' : region , 'continents' : continent , 

																																							'centuries' : century , 'genres' : genre , 'sound' : sound , 'errors' : errArr , 'rmethod' : 'POST'	});				});		}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : sConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;		
																																														res.redirect(`/sound/${data.url}`);		})
																			.catch((err) => {		errors = [];

																				console.log('Following is error');

																				console.log(err);
																																				if (err.response.status == 400 || err.response.statusText == 'Bad Request') { url = `${sConfig.reqOptions.url}add`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																													
																													century = data.Century , genre = data.Genre;
																																																											clientErr.formAdd(err , errors);

																																																											console.log('Compiled Error');

																																																											console.log(errors);
																					
												res.render('forms/add_forms/sound_add' , { 'title': 'Add a new Sound' , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent , 

																																	'centuries' : century , 'genres' : genre , 'sound' : sound , 'errors' : errors , 'rmethod' : 'POST'	});			}); 
																																																																																										return false; }		
																									status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status 		});		});			}																																																	
	}] , 

	'soundUpdate' : (req , res , next) => {	sound = req.params.sound , url = `${sConfig.reqOptions.url}update/${sound}`;

		axios.get(url).then((response) => {	 data = response.data.status , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,

																					century = data.Century , genre = data.Genre , sound = data.Sound , sUpdate['title'] = sound.title;

																										res.render('forms/add_forms/sound_add' , { 'title': `Update Sound ${sUpdate.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																									 							'continents' : continent , 'centuries' : century , 'genres' : genre , 'sound' : sound , 'rmethod' : 'PUT'  });	})
						.catch((err) => {	status = err.response;
																											res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'soundUpdateSubmit' : [

				upload.single('sound') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 1 })
																																																												.withMessage('Title cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 120 })
																																																												.withMessage('Title cannot be greater than 120 characters in length.')
																																															.trim() ,

				body('date'								,		'Date should be provided and cannot be empty.')					.isLength({ 'min' : 1 })
																																																												.withMessage('Date cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 10 })
																																																												.withMessage('Date cannot be greater than 10 characters in length.')
																																															.trim() ,

				body('century'						,		'Century should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('genre'							,		'Category should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('country'						,		'Country should be provided and cannot be empty.')			.isLength({ 'min' : 3 }).trim() ,
				body('continent'					,		'Continent should be provided and cannot be empty.')		.isLength({ 'min' : 3 }).trim() ,
				body('ethnic_group'				, 	'Ethnic Group should be provided and cannot be empty.')	.isLength({ 'min' : 3 }).trim() ,

				body('about'							, 	'About sound should be provided and cannot be empty.')	.isLength({ 'min' : 1 })
																																																												.withMessage('About Sound cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('About Sound cannot be greater than 2000 characters in length.')
																																															.trim().escape() ,
				sConfig.validate , sConfig.addFileUpload ,
				
				(req , res , next) => { sParam = req.params.sound;

					sound = new Sound(req.body);

					errors = validationResult(req);

					errArr = errors.array();
																			if (req.body.error3) {		errArr.push(req.body.error3);		}

								if (errArr.length !== 0) {		if (req.file && req.body.error3) { 
																																									sConfig.delete(req , errArr); }
											url = `${sConfig.reqOptions.url}update/${sParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																															century = data.Century , continent = data.Continent , region = data.Region , currentSound = data.Sound
																					
															res.render('forms/add_forms/sound_add' , { 'title': `Update Sound ${currentSound.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																						   
																																				 'centuries' : century , 'genres' : genre , 'sound' : sound , 'errors' : errArr	, 'rmethod' : 'PUT'	});		});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${sConfig.reqOptions.url}${sParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/sound`);		})
															.catch((err) => {		errors = [];
																																				if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${sConfig.reqOptions.url}update/${sParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																													
																													century = data.Century , genre = data.Genre , currentSound = data.Sound;
																																																																		clientErr.formAdd(err , errors);
																					
															res.render('forms/add_forms/sound_add' , { 'title': `Update Sound ${currentSound.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																						   
																																					'centuries' : century , 'genres' : genre , 'sound' : sound , 'errors' : errors , 'rmethod' : 'PUT'	});			}); 
																																																																																														return false; }
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});				}
   }]	, 

	'soundDelete' : (req , res , next) => {	sound = req.params.sound , url = `${sConfig.reqOptions.url}d/${sound}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('forms/delete_forms/sound_delete' , {'title' : `Remove Sound ${data.title}` , 'sound' : data 	});			})
									.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'soundDeleteSubmit' : (req , res , next) => {	sound = req.params.sound;

			axios({  	'method': 'delete' ,
																		  'url' : `${sConfig.reqOptions.url}${sound}`})
			
			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/sound');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});							});
	} ,


	'soundVote' : (req , res , next) => {	sound = req.params.sound;

			axios({  	'method': 'post' ,
																		'url' : `${sConfig.reqOptions.url}${sound}/vote` })
			.then((response) => {		
																														console.log(response.data)		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});																		});
	}

}