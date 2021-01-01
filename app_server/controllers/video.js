const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

Video = require('../../app_api/models/video') , eConfig = require('../config/eyon') , vConfig = require('../config/video') , errors = '' , vUpdate = {} ,

cConfig = require('../config/country') , axios = require('axios') , url = '' , data = '' , ethnic = '' , video = '' , eyon = '' , vParam = '' , multer = require('multer') ,

upload = multer({ 'storage' : vConfig.mConfig }) ,  clientErr = require('./helpers/compiledError') , errArr = '';

module.exports = {

	'videoAll' : (req , res , next) => {  url = `${vConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('video/list_video' , { 'title': 'List of Videos' , 'videos' : data });				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Video entries not available' , 'error' : status 	})						});
	} ,

	'videoCountryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('video/list_country' , { 'title': 'List of Videos of Countries' , 'countries' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})			});
	} ,

	'videoEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('video/list_ethnic' , { 'title': 'List of Videos of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})			});
	} ,

	'videoEthnic' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${vConfig.reqOptions.url}ethnic/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Videos`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('video/list_video' , { 'title' : title , 'videos' : data , 'ethnic' : ethnic });				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Video entries not available' , 'error' : status 	})						});
	} ,	

	'videoCountry' : (req , res , next) => { country = req.params.country.toLowerCase() , url = `${vConfig.reqOptions.url}country/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)} Videos`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('video/list_video' , { 'title' : title , 'videos' : data });				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Video entries not available' , 'error' : status 	})				});
	} ,	

	'videoDetail' : (req , res , next) => { 	video = req.params.video , url = `${vConfig.reqOptions.url}d/${video}`;

			axios.get(url).then((response) => {	data = response.data.status , title = data.title;	
																																															res.render('video/video_detail' , { 'title' : title , 'video' : data 	});				})
									.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Video entry not available' , 'error' : status 	})					});
	} ,

	'videoAdd' : (req , res , next) => {	url = `${vConfig.reqOptions.url}add`;	

		axios.get(url).then((response) => {	data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent , century = data.Century , genre = data.Genre;

																													res.render('forms/add_forms/video_add' , { 'title': 'Add a new Video' , 'eyons' : eyon , 'countries' : country , 'regions' : region , 

																																																		'continents' : continent , 'centuries' : century , 'genres' : genre , 'rmethod' : 'POST' 	});			})										
										.catch((err) => {	status = err.response;
																															res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} , 

	'videoAddSubmit' :  [ 	

				upload.single('video') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 1 })
																																																												.withMessage('Title cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 120 })
																																																												.withMessage('Title of Video cannot be greater than 120 characters in length.')
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

				body('about'							, 	'About video should be provided and cannot be empty.')	.isLength({ 'min' : 1 })
																																																												.withMessage('About Video cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('About Video cannot be greater than 2000 characters in length.')
																																															.trim().escape() ,
				sanitizeBody('*').trim() ,

				vConfig.checkFileUpload , vConfig.validate , vConfig.addFileUpload ,
				
				(req , res , next) => {	video = new Video(req.body);

				 errors = validationResult(req);

				 errArr = errors.array();
																						if (req.body.error2) {	errArr.push(req.body.error2);		}

																						if (req.body.error3) {	errArr.push(req.body.error3);		}
								
								if (errArr.length != 0) {			if (req.file && req.body.error3) { 
																																									vConfig.delete(req , errArr); }
									url = `${vConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , 

																													continent = data.Continent , century = data.Century , genre = data.Genre;
																					
																	res.render('forms/add_forms/video_add' , { 'title': 'Add a new Video' , 'eyons' : eyon ,	'countries' : country , 'regions' : region , 'continents' : continent , 

																																							'centuries' : century , 'genres' : genre , 'video' : video , 'errors' : errArr , 'rmethod' : 'POST' });				});		}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : vConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		data = response.data.status;		
																																														res.redirect(`/video/${data.url}`);		})
																			.catch((err) => {		errors = [];
																																				if (err.response.status == 400 || err.response.statusText == 'Bad Request') { url = `${vConfig.reqOptions.url}add`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																													
																													century = data.Century , genre = data.Genre;
																																																											clientErr.formAdd(err , errors);
																					
												res.render('forms/add_forms/video_add' , { 'title': 'Add a new Video' , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent , 

																																	'centuries' : century , 'genres' : genre , 'video' : video , 'errors' : errors , 'rmethod' : 'POST' 	});			}); 
																																																																																											return false; }		
																									status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status 		});		});			}																																																	
	}] , 

	'videoUpdate' : (req , res , next) => {	video = req.params.video , url = `${vConfig.reqOptions.url}update/${video}`;

		axios.get(url).then((response) => {	 data = response.data.status , eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,

																					century = data.Century , genre = data.Genre , video = data.Video , vUpdate['title'] = video.title;

																												res.render('forms/add_forms/video_add' , { 'title': `Update Video ${vUpdate.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region ,

																																									 					'continents' : continent , 'centuries' : century , 'genres' : genre , 'video' : video , 'rmethod' : 'PUT'   });	})
							.catch((err) => {	status = err.response;
																												res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'videoUpdateSubmit' : [

				upload.single('video') ,

				body('title'							,		'Title should be provided and cannot be empty.')				.isLength({ 'min' : 1 })
																																																												.withMessage('Title cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 120 })
																																																												.withMessage('Title of Video cannot be greater than 120 characters in length.')
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

				body('about'							, 	'About video should be provided and cannot be empty.')	.isLength({ 'min' : 1 })
																																																												.withMessage('About Video cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 2000 })
																																																												.withMessage('About Video cannot be greater than 2000 characters in length.')
																																															.trim().escape() ,
				vConfig.validate , vConfig.addFileUpload ,
				
				(req , res , next) => { vParam = req.params.video;

					video = new Video(req.body);

					errors = validationResult(req);

					errArr = errors.array();
																			if (req.body.error3) {		errArr.push(req.body.error3);		}

								if (errArr.length !== 0) {		if (req.file && req.body.error3) { 
																																									vConfig.delete(req , errArr); }
											url = `${vConfig.reqOptions.url}update/${vParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon ,	genre = data.Genre , country = data.Country ,

																															century = data.Century , continent = data.Continent , region = data.Region , currentVideo = data.Video
																					
															res.render('forms/add_forms/video_add' , { 'title': `Update Video ${currentVideo.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																						   
																																				 'centuries' : century , 'genres' : genre , 'video' : video , 'errors' : errArr	, 'rmethod' : 'PUT'  });		});		}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${vConfig.reqOptions.url}${vParam}` , 
																								  																 												'data' : req.body 	})
															.then((response) => {		data = response.data.status;
																																										req.flash('info', 'Entry successfully updated.');
																																																																			res.redirect(`/update/video`);		})
															.catch((err) => {		errors = [];
																																				if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${vConfig.reqOptions.url}update/${vParam}`;

											axios.get(url).then((response) => { data = response.data.status ,	eyon = data.Eyon , country = data.Country , region = data.Region , continent = data.Continent ,
																													
																													century = data.Century , genre = data.Genre , currentVideo = data.Video;
																																																																		clientErr.formAdd(err , errors);
																					
															res.render('forms/add_forms/video_add' , { 'title': `Update Video ${currentVideo.title}` , 'eyons' : eyon , 'countries' : country , 'regions' : region , 'continents' : continent ,
																																						   
																																					'centuries' : century , 'genres' : genre , 'video' : video , 'errors' : errors , 'rmethod' : 'PUT'  });			}); 
																																																																																														return false; }
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});				}
   }]	, 

	'videoDelete' : (req , res , next) => {	video = req.params.video , url = `${vConfig.reqOptions.url}d/${video}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																					res.render('forms/delete_forms/video_delete' , {'title' : `Remove Video ${data.title}` , 'video' : data 	});			})
									.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'videoDeleteSubmit' : (req , res , next) => {	video = req.params.video;

			axios({  	'method': 'delete' ,
																		  'url' : `${vConfig.reqOptions.url}${video}`})
			
			.then((response) => {	req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/video');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});							});
	} ,


	'videoVote' : (req , res , next) => {	video = req.params.video;

			axios({  	'method': 'post' ,
																		'url' : `${vConfig.reqOptions.url}${video}/vote` })
			.then((response) => {		
																														console.log(response.data)		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});																		});
	}

}