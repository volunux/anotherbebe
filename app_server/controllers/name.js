const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var axios = require('axios') , Name = require('../../app_api/models/models').Name , eConfig = require('../config/eyon') , nConfig = require('../config/name') , url = '' , data = '' , ethnic = '' ,

alpha = '' , gender = '' , name = '' , eyon = '' , nParam = '' , alphabet = '' , specie = '' , continent = '' , region = '', baby = '' , errors = '' , clientErr = require('./helpers/compiledError') ,

errArr = '' , modelType = 'Name' , modelTypes = 'Names';

module.exports = {

	'namesAll' : (req , res , next) => { url = `${nConfig.reqOptions.url}`

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_name' , { 'title': `List of ${modelTypes}` , 'names' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'nameAnimalAll' : (req , res , next) => { url = `${nConfig.reqOptions.url}specie/animal`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_name_animal' , { 'title': `List of Animal ${modelTypes}` , 'names' : data 	});				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(2);
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'namePlantAll' : (req , res , next) => { url = `${nConfig.reqOptions.url}specie/plant`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_name_plant' , { 'title': `List of Plant ${modelTypes}` , 'names' : data 	});				})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(2);
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'nameEthnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_ethnic' , { 'title': `List of ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'nameAnimalList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_animal' , { 'title': `List of Animal ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'namePlantList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data;
																																				res.render('name/list_plant' , { 'title': `List of Plant ${modelTypes} of Ethnic Groups` , 'eyons' : data 	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'nameHuman' : (req , res , next) => { ethnic = req.params.ethnic ,	url = `${nConfig.reqOptions.url}nation/${ethnic}` , title = `List of ${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes}`;

			axios.get(url)
										.then((response) => {		data = response.data;
																																				res.render('name/list_name' , {'title' : title , 'names' : data 	})		 		})
										.catch((err) => {				status = err.response;

											res.locals.breadcrumb.splice(3);
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})		});
	} , 

	'nameEthnicAnimal' : (req , res , next) => {  ethnic = req.params.ethnic , title = `${modelTypes} of Animals in ${ethnic[0].toUpperCase()}${ethnic.slice(1)}` ,

																					url = `${nConfig.reqOptions.url}animal/${ethnic}`;
			axios.get(url)
										.then((response) => {	data = response.data;
																																					res.render('name/list_name_animal'  , {'title' : title , 'names' : data 	});		})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameEthnicPlant' : (req , res , next) => { ethnic = req.params.ethnic , title = `${modelTypes} of Plants in ${ethnic[0].toUpperCase()}${ethnic.slice(1)}` ,

																					url = `${nConfig.reqOptions.url}plant/${ethnic}`;
			axios.get(url)
										.then((response) => {	data = response.data;
																																					res.render('name/list_name_plant'  , {'title' : title , 'names' : data 	});		 		})
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																					res.render('error' , {'title' : 'Error' , 'error' : status 	})			});
	} , 

	'nameHumanAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , title = `List of ${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes} by Alphabet` ,

																								url = `${eConfig.reqOptions.url}name/${ethnic}`;
			axios.get(url)
										.then((response) => {																						
																																					res.render('name/alphabets' , {'title' : title , 'eyon' : ethnic})		 		})
										.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(3);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameAnimalAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , title = `${modelTypes} of Animals in ${ethnic[0].toUpperCase()}${ethnic.slice(1)} by Alphabet` ,

																								 url = `${eConfig.reqOptions.url}name/${ethnic}`;
			axios.get(url)
										.then((response) => {
																																					res.render('name/animal_names_alphabet' , {'title' : title , 'eyon' : ethnic 	});		 		})
										.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(3);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'namePlantAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , title = `${modelTypes} of Plants in ${ethnic[0].toUpperCase()}${ethnic.slice(1)} by Alphabet` ,

																								url = `${eConfig.reqOptions.url}name/${ethnic}`;
			axios.get(url)
										.then((response) => {	data = response.data;
																																					res.render('name/plant_names_alphabet'  , {'title' : title , 'eyon' : ethnic 	});		 		})
										.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(3);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameGender' : (req , res , next) => { ethnic = req.params.ethnic , gender = req.params.gender , url = `${nConfig.reqOptions.url}nation/${ethnic}/gender/${gender}` ,

																					title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes} for ${gender[0].toUpperCase()}${gender.slice(1)}`;

			axios.get(url).then((response) => {	data = response.data;
																																					res.render('name/list_name_gender' , { 'title': title , 'names' : data});		})
										.catch((err) => {					status = err.response;

											res.locals.breadcrumb.splice(5);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameDetail' : (req , res , next) => { 	name = req.params.name , url = `${nConfig.reqOptions.url}d/${name}` , ethnic = req.params.ethnic;

				axios.get(url , {
													'data' : {
																			'ethnic' : ethnic 	}

										}).then((response) => {	data = response.data , title = `${data.ethnic_group} ${modelType} - ${data.name}`;

																									 										res.render('name/name_detail' , { 'title': title , 'name' : data });				})			
											.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status});				});
	} , 

	'nameAnimalDetail' : (req , res , next) => { 	name = req.params.name , url = `${nConfig.reqOptions.url}animal/d/${name}` , ethnic = req.params.ethnic;

				axios.get(url , {
													'data' : {
																			'ethnic' : ethnic 	}

										}).then((response) => {	data = response.data , title = `${data.ethnic_group} ${modelType} - ${data.name}`;

																									 									 	res.render('name/name_detail' , { 'title': title , 'name' : data });				})			
											.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status});			});
	} , 

	'namePlantDetail' : (req , res , next) => { 	name = req.params.name , url = `${nConfig.reqOptions.url}plant/d/${name}` , ethnic = req.params.ethnic;

				axios.get(url , {
													'data' : {
																			'ethnic' : ethnic 	}

										}).then((response) => {	data = response.data , title = `${data.ethnic_group} ${modelType} - ${data.name}`;

																									 										res.render('name/name_detail' , { 'title': title , 'name' : data });			})		
											.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'nameByAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , alpha = req.params.alphabet , url = `${nConfig.reqOptions.url}${ethnic}/nation/alphabet/${alpha}` ,

																							title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} ${modelTypes} under Alphabet ${alpha.toUpperCase()}`;

			axios.get(url).then((response) => {	data = response.data;

					res.render('name/ethnic_names_alphabet_detail' , { 'title' : title , 'names' : data , 'eyon' : ethnic , 'alpha' : alpha });		})
											
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status});			});
	} , 

	'nameAnimalByAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , alpha = req.params.alphabet , url = `${nConfig.reqOptions.url}${ethnic}/animal/alphabet/${alpha}` ,

																							title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Animal ${modelTypes} under Alphabet ${alpha.toUpperCase()}`;

			axios.get(url).then((response) => {	data = response.data , people = req.params.ethnic.toLowerCase();

					res.render('name/ethnic_name_animal_alphabet' , { 'title': title , 'names' : data , 'eyon' : ethnic , 'alpha' : alpha });		})
											
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status});				});
	} ,  

	'namePlantByAlphabet' : (req , res , next) => { ethnic = req.params.ethnic , alpha = req.params.alphabet , url = `${nConfig.reqOptions.url}${ethnic}/plant/alphabet/${alpha}` ,

																							title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Plant ${modelTypes} under Alphabet ${alpha.toUpperCase()}`;

			axios.get(url).then((response) => {	data = response.data , people = req.params.ethnic.toLowerCase();

					res.render('name/ethnic_name_plant_alphabet' , { 'title': title , 'names' : data , 'eyon' : ethnic , 'alpha' : alpha });		})
											
										.catch((err) => {			status = err.response;

											res.locals.breadcrumb.splice(3);
																																			res.render('error' , {'title' : 'Error' , 'error' : status});				});
	} ,  

	'nameAdd' : (req , res , next) => {	url = `${nConfig.reqOptions.url}add`;

			axios.get(url).then((response) => {

			 	data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region;
																					
		res.render('forms/add_forms/name_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'alphabets' : alphabet , 'baby' : baby , 'genders' : gender , 

																							'species' : specie , 'continents' : continent , 'regions' : region , 'rmethod' : 'POST' });					})

										.catch((err) => {		status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status});		});
	} , 

	'nameAddSubmit' :  [

				body('name'								,		'Name should be provided and cannot be empty .')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 36})
																																																													.withMessage('Name cannot be greater than 36 characters in length.') ,
				body('definition'					, 	'Defintion should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 300})
																																																													.withMessage('Name definition cannot be greater than 300 characters in length.') ,
				body('morphology'					, 	'Morphology should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Morphology cannot be greater than 200 characters in length.') ,
				body('gloss'							, 	'Gloss should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Gloss cannot be greater than 200 characters in length.') ,
				body('alphabet'						, 	`Alphabet cannot be empty and should be provided.`)				.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 3})
																																																													.withMessage(`Alphabet cannot be greater than 3 characters in length.`) ,
				body('ethnic_group'				, 	`Ethnic Group cannot be empty and should be provided.`)		.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('continent'					, 	`Continent cannot be empty and should be provided.`)			.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							, 	`Region should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('gender'							, 	`Gender should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Gender cannot be greater than 10 characters in length.`) ,
				body('specie'							, 	`Specie should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Specie cannot be greater than 10 characters in length.`) ,
				body('baby'								, 	`Baby should be provided and cannot be empty.`)						.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Baby cannot be greater than 10 characters in length.`) ,
				sanitizeBody('*').trim() ,

				(req , res , next) => {	name = new Name(req.body);

				 errors = validationResult(req);

				 errArr = errors.array();

								if (errArr.length != 0) {		url = `${nConfig.reqOptions.url}add`;
																					
				axios.get(url)
											.then((response) => {	 	data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , 

																							gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region;
																			
			res.render('forms/add_forms/name_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'continents' : continent , 'regions' : region , 'alphabets' : alphabet , 'genders' : gender , 'baby' : baby , 

																											'species' : specie , 'name' : name , 'rmethod' : 'POST' , 'errors' : errArr	});		})
																												
										.catch((err) => {		status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status}) })			}
        							else {
															url = `${nConfig.reqOptions.url}name/${name.name}`;

															axios.get(url , {
																								'data' : {
																															'ethnic' : name.ethnic_group ,

																															'specie' : name.specie	}
															})
																	.then((response) => { data = response.data , name = response.data.name.toLowerCase() , ethnic = response.data.ethnic_group.toLowerCase();

																																if (response.status == 200 && (data.specie == 'Human')) {

																																			return	res.redirect(`/name/nation/${ethnic}/${name}`);		}

																																if (response.status == 200 && (data.specie == 'Animal')) {

																																			return	res.redirect(`/name/animal/${ethnic}/${name}`);		}

																																if (response.status == 200 && (data.specie == 'Plant')) {

																																			return	res.redirect(`/name/plant/${ethnic}/${name}`);		}						})
																								.catch((err) => {
																																		axios({  	'method': 'post' ,
																																														  		'url' : nConfig.reqOptions.url ,
																																		  															 																'data' : req.body 	})
																						.then((response) => {	data = response.data , name = data.name.toLowerCase();

																																	ethnic = data.ethnic_group.toLowerCase();

																																if (response.status == 200 && (data.specie == 'Human')) {

																																						return res.redirect(`/name/nation/${ethnic}/${name}`);		}

																																if (response.status == 200 && (data.specie == 'Animal')) {

																																						return res.redirect(`/name/animal/${ethnic}/${name}`);		}

																																if (response.status == 200 && (data.specie == 'Plant')) {

																																						return	res.redirect(`/name/plant/${ethnic}/${name}`);		}					})
																						.catch((err) => {	errors = [];
																																						if (err.response.status == 400) {

																																						 	url = `${nConfig.reqOptions.url}add`;
																																					
			return axios.get(url).then((response) => { 	data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , 

																					gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region;
																																																																							clientErr.formAdd(err , errors);
																			
				return res.render('forms/add_forms/name_add' , { 'title': `Add a new ${modelType}` , 'eyons' : eyon , 'continents' : continent , 'alphabets' : alphabet , 'genders' : gender , 'baby' : baby , 

																												'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'POST' , 'errors' : errors });		})

										.catch((err) => {	status = err.response;
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});			} 
										status = err.response;												
																						res.render('error' , {'title' : 'Error' , 'error' : status});		});		});			}																															
	}], 

	'nameUpdate' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}update/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

		axios.get(url , {
											'data' : {
																	'ethnic' : ethnic ,

																	'specie' : 'Human' }	}
			).then((response) => {
														 	data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																																gender = data.Gender , specie = data.Specie , continent = data.Continent , name = data.Name , currentName = data.Name;

		res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 'baby' : baby ,

																							'name' : name , 'species' : specie , 'continents' : continent , 'regions' : region , 'rmethod' : 'PUT'			});		})					
										
										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameUpdateSubmit' : [

				body('name'								,		'Name should be provided and cannot be empty .')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 36})
																																																													.withMessage('Name cannot be greater than 36 characters in length.') ,
				body('definition'					, 	'Defintion should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 300})
																																																													.withMessage('Name definition cannot be greater than 300 characters in length.') ,
				body('morphology'					, 	'Morphology should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Morphology cannot be greater than 200 characters in length.') ,
				body('gloss'							, 	'Gloss should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Gloss cannot be greater than 200 characters in length.') ,
				body('alphabet'						, 	`Alphabet cannot be empty and should be provided.`)				.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 3})
																																																													.withMessage(`Alphabet cannot be greater than 3 characters in length.`) ,
				body('ethnic_group'				, 	`Ethnic Group cannot be empty and should be provided.`)		.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('continent'					, 	`Continent cannot be empty and should be provided.`)			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							, 	`Region should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('gender'							, 	`Gender should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Gender cannot be greater than 10 characters in length.`) ,
				body('specie'							, 	`Specie should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Specie cannot be greater than 10 characters in length.`) ,
				body('baby'								, 	`Baby should be provided and cannot be empty.`)						.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Baby cannot be greater than 10 characters in length.`) ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {	name = new Name(req.body) , nParam = req.params.name , ethnic = req.params.ethnic;

				 errors = validationResult(req);

				 errArr = errors.array();

					if (errArr.length != 0) { url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

						axios.get(url , {
															'data' : {
																					'ethnic' : ethnic ,

																					'specie' : 'Human' }	})

									.then((response) => {		data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																					gender = data.Gender , specie = data.Specie , continent = data.Continent , name = name , currentName = data.Name;

			res.render('forms/add_forms/name_add' , { 'title': 	`Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 'baby' : baby , 

																								'species' : specie , 'continents' : continent , 'regions' : region , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errArr		}); 	})	

										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
  							
  							else {	url = `${nConfig.reqOptions.url}name/${name.name}`;

												axios.get(url , {
																					'data' : {
																											'ethnic' : ethnic	,

																											'specie' : 'Human'		}		})

														.then((response) => {		if (response.status == 200) {

												axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data , ethnic = data.ethnic_group;

																																					if (response1.status == 200) {

																																										if (response1.status == 200 && (data.specie == 'Human')) {

																																													return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Animal')) {

																																													return	res.redirect(`/name/animal/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Plant')) {

																																													return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}	})
										.catch((err) => {		req.body.prevEthnic = req.params.ethnic;

																				req.body.prevSpecie = 'Human';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Human'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

															.catch((err) => {	status = err.response;

																res.locals.breadcrumb.splice(4);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});		}		});			}) 				}		})

															.catch((err) => {		status = err.response;

																if (err.response.data.message == 'Name entry does not exists in the record or is not available.') {	url = `${nConfig.reqOptions.url}name/${name.name}`;

								return axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data;
																																						if (response1.status == 200) {

																																											if (response1.status == 200 && (data.specie == 'Human')) {

																																														return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Animal')) {

																																														return	res.redirect(`/name/animal/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Plant')) {

																																														return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}	})
										.catch((err) => {		req.body.prevEthnic = req.params.ethnic;

																				req.body.prevSpecie = 'Human';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Human'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

															.catch((err) => {	status = err.response;

																res.locals.breadcrumb.splice(4);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});		}		});			})	}

																																					res.render('error' , {'title' : 'Error' , 'error' : status 	});				} ) 	}
	}] , 

	'nameAnimalUpdate' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}update/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

		axios.get(url , {
											'data' : {
																	'ethnic' : ethnic ,

																	'specie' : 'Animal'}	}
			).then((response) => {

			 	data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																					gender = data.Gender , name = data.Name , specie = data.Specie , continent = data.Continent , currentName = data.Name;

		res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 'baby' : baby ,

																																					'name' : name , 'species' : specie , 'continents' : continent , 'regions' : region , 'rmethod' : 'PUT'			});		})
										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																		res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameAnimalUpdateSubmit' : [

				body('name'								,		'Name should be provided and cannot be empty .')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 36})
																																																													.withMessage('Name cannot be greater than 36 characters in length.') ,
				body('definition'					, 	'Defintion should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 300})
																																																													.withMessage('Name definition cannot be greater than 300 characters in length.') ,
				body('morphology'					, 	'Morphology should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Morphology cannot be greater than 200 characters in length.') ,
				body('gloss'							, 	'Gloss should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Gloss cannot be greater than 200 characters in length.') ,
				body('alphabet'						, 	`Alphabet cannot be empty and should be provided.`)				.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 3})
																																																													.withMessage(`Alphabet cannot be greater than 3 characters in length.`) ,
				body('ethnic_group'				, 	`Ethnic Group cannot be empty and should be provided.`)		.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('continent'					, 	`Continent cannot be empty and should be provided.`)			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							, 	`Region should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('gender'							, 	`Gender should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Gender cannot be greater than 10 characters in length.`) ,
				body('specie'							, 	`Specie should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Specie cannot be greater than 10 characters in length.`) ,
				body('baby'								, 	`Baby should be provided and cannot be empty.`)						.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Baby cannot be greater than 10 characters in length.`) ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {			name = new Name(req.body) , nParam = req.params.name , ethnic = req.params.ethnic;

				 errors = validationResult(req);

				 errArr = errors.array();

					if (errArr.length != 0) { url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

						axios.get(url , {
															'data' : {
																					'ethnic' : ethnic ,

																					'specie' : 'Animal' }	})

									.then((response) => {		data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																					gender = data.Gender , specie = data.Specie , continent = data.Continent , name = name , currentName = data.Name;

			res.render('forms/add_forms/name_add' , { 'title': 	`Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 'baby' : baby , 

																								'species' : specie , 'continents' : continent , 'regions' : region , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errArr		}); 	})

										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
  							
  							else {	url = `${nConfig.reqOptions.url}name/${name.name}`;

												axios.get(url , {
																					'data' : {
																											'ethnic' : ethnic	,

																											'specie' : 'Animal'		}		})

														.then((response) => {		if (response.status == 200) {

												axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data , ethnic = data.ethnic_group;

																																						if (response1.status == 200) {

																																											if (response1.status == 200 && (data.specie == 'Human')) {

																																														return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Animal')) {

																																														return	res.redirect(`/name/animal/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Plant')) {

																																														return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}		})
													.catch((err) => {		req.body.prevEthnic = req.params.ethnic;

															req.body.prevSpecie = 'Animal';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Animal'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}`  , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

																.catch((err) => {	status = err.response;

																	res.locals.breadcrumb.splice(4);
																																						res.render('error' , {'title' : 'Error' , 'error' : status})	});	}		});		}) 	}		})
																.catch((err) => {		status = err.response;

																if (err.response.data.message == 'Name entry does not exists in the record or is not available.') {	url = `${nConfig.reqOptions.url}name/${name.name}`;

								return axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data;
																																					if (response1.status == 200) {

																																										if (response1.status == 200 && (data.specie == 'Human')) {

																																													return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Animal')) {

																																													return	res.redirect(`/name/animal/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Plant')) {

																																													return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}	})
														.catch((err) => {		req.body.prevEthnic = req.params.ethnic;

																				req.body.prevSpecie = 'Animal';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Animal'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

															.catch((err) => {	status = err.response;

																res.locals.breadcrumb.splice(4);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});			}		});			})		}

																																							res.render('error' , {'title' : 'Error' , 'error' : status 	});				} ) }				}
] ,

	'namePlantUpdate' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}update/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

		axios.get(url , {
											'data' : {
																	'ethnic' : ethnic ,
																											'specie' : 'Plant' }	})
			.then((response) => {

			 	data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																					gender = data.Gender , name = data.Name , specie = data.Specie , continent = data.Continent , currentName = data.Name;

			res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 'baby' : baby ,

																								'name' : name , 'species' : specie , 'continents' : continent , 'regions' : region , 'rmethod' : 'PUT'		});		})
										
										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																		res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'namePlantUpdateSubmit' : [

				body('name'								,		'Name should be provided and cannot be empty .')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 36})
																																																													.withMessage('Name cannot be greater than 36 characters in length.') ,
				body('definition'					, 	'Defintion should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 300})
																																																													.withMessage('Name definition cannot be greater than 300 characters in length.') ,
				body('morphology'					, 	'Morphology should be provided and cannot be empty.')			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Morphology cannot be greater than 200 characters in length.') ,
				body('gloss'							, 	'Gloss should be provided and cannot be empty.')					.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 200})
																																																													.withMessage('Gloss cannot be greater than 200 characters in length.') ,
				body('alphabet'						, 	`Alphabet cannot be empty and should be provided.`)				.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 3})
																																																													.withMessage(`Alphabet cannot be greater than 3 characters in length.`) ,
				body('ethnic_group'				, 	`Ethnic Group cannot be empty and should be provided.`)		.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Ethnic Group cannot be greater than 40 characters in length.`) ,
				body('continent'					, 	`Continent cannot be empty and should be provided.`)			.isLength({ 'min' : 1 })

																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Continent cannot be greater than 40 characters in length.`) ,
				body('region'							, 	`Region should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 40})
																																																													.withMessage(`Region cannot be greater than 40 characters in length.`) ,
				body('gender'							, 	`Gender should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Gender cannot be greater than 10 characters in length.`) ,
				body('specie'							, 	`Specie should be provided and cannot be empty.`)					.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Specie cannot be greater than 10 characters in length.`) ,
				body('baby'								, 	`Baby should be provided and cannot be empty.`)						.isLength({ 'min' : 1 })
																																																
																																																.isLength({ 'max' : 10})
																																																													.withMessage(`Baby cannot be greater than 10 characters in length.`) ,
				sanitizeBody('*').trim() ,
				
				(req , res , next) => {			name = new Name(req.body) , nParam = req.params.name , ethnic = req.params.ethnic;

				 errors = validationResult(req);

				 errArr = errors.array();

					if (errArr.length != 0) { url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

						axios.get(url , {
															'data' : {
																					'ethnic' : ethnic ,

																					'specie' : 'Plant' }	})

									.then((response) => {		data = response.data ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , region = data.Region ,

																					gender = data.Gender , specie = data.Specie , continent = data.Continent , name = name , currentName = data.Name;

			res.render('forms/add_forms/name_add' , { 'title': 	`Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 'baby' : baby , 

																								'species' : specie , 'continents' : continent , 'regions' : region , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errArr		}); 	})

										.catch((err) => {	status = err.response;

											res.locals.breadcrumb.splice(4);
																																res.render('error' , {'title' : 'Error' , 'error' : status})	});		}
  							
  							else {	url = `${nConfig.reqOptions.url}name/${name.name}`;

												axios.get(url , {
																					'data' : {
																											'ethnic' : ethnic	,

																											'specie' : 'Plant'		}		})

														.then((response) => {		if (response.status == 200) {

												axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data , ethnic = data.ethnic_group;

																																						if (response1.status == 200) {

																																											if (response1.status == 200 && (data.specie == 'Human')) {

																																														return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Animal')) {

																																														return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}

																																											if (response1.status == 200 && (data.specie == 'Plant')) {

																																														return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}	})
								.catch((err) => {		req.body.prevEthnic = ethnic;

																		req.body.prevSpecie = 'Plant';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Plant'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}`  , 'genders' : gender , 'eyons' : eyon , 'alphabets' : alphabet , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

															.catch((err) => {	status = err.response;

																res.locals.breadcrumb.splice(4);
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});		}		});			}) 				}		})
															
															.catch((err) => {		status = err.response;

																if (err.response.data.message == 'Name entry does not exists in the record or is not available.') {	url = `${nConfig.reqOptions.url}name/${name.name}`;

								return axios.get(url , {
																					'data' : {
																											'ethnic' : name.ethnic_group	,

																											'specie' : name.specie		}		})

														.then((response1) => {	data = response1.data;
																																					if (response1.status == 200) {

																																										if (response1.status == 200 && (data.specie == 'Human')) {

																																													return	res.redirect(`/name/nation/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Animal')) {

																																													return	res.redirect(`/name/animal/${ethnic}/${data.name.toLowerCase()}`);		}

																																										if (response1.status == 200 && (data.specie == 'Plant')) {

																																													return	res.redirect(`/name/plant/${ethnic}/${data.name.toLowerCase()}`);		}			}	})
										.catch((err) => {		req.body.prevEthnic = req.params.ethnic;

																				req.body.prevSpecie = 'Plant';
			
																				axios({  	'method': 'put' ,
																																  		'url' : nConfig.reqOptions.url + nParam  ,
																				  															 																					'data' : req.body 	})
																				.then((response) => {	req.flash('info', 'Entry successfully updated.');
																																																								res.redirect('/name/');		})
																							.catch((err) => {	errors = [];
																																							if (err.response.status == 400) {		url = `${nConfig.reqOptions.url}update/${nParam}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/update' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/update' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/update' , '');

																return axios.get(url ,  {

																								'data' : {
																														'ethnic' : ethnic ,
																																								'specie' : 'Plant'	}	})

																.then((response) => {		clientErr.formAdd(err , errors);
			 	
data = response.data ,	eyon = data.Eyon , alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , specie = data.Specie , continent = data.Continent , region = data.Region , currentName = data.Name;

		return res.render('forms/add_forms/name_add' , { 'title': `Update ${currentName.ethnic_group} ${modelType} - ${currentName.name}` , 'eyons' : eyon , 'alphabets' : alphabet , 'genders' : gender , 

													'baby' : baby , 'continents' : continent , 'regions' : region , 'species' : specie , 'name' : name , 'rmethod' : 'PUT' , 'errors' : errors });		})

																.catch((err) => {	status = err.response;

																	res.locals.breadcrumb.splice(4);
																																						res.render('error' , {'title' : 'Error' , 'error' : status})	});		}		});			})		}

																																						res.render('error' , {'title' : 'Error' , 'error' : status 	});				} ) }				}

] ,

	'nameDelete' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}delete/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');
		
			axios.get(url , {
												'data' : {
																		'ethnic' : ethnic	,
																												'specie' : 'Human' }	})
		.then((response) => { 	data = response.data;
																																		res.render('forms/delete_forms/name_delete' , {'title' : `Remove ${data.ethnic_group} Name - ${data.name}` , 'name' : data 	});			})
									.catch((err) => {			status = err.response;

										res.locals.breadcrumb.splice(4);
																																		res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameDeleteSubmit' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic;

			axios({  	'method': 'delete' ,
																		  'url' : `${nConfig.reqOptions.url}${name}`	, 'data' : {
																			  																													'ethnic' : ethnic ,
																																																											'specie' : 'Human' 	}		})
			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/name');		})
			.catch((err) => {			status = err.response;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');

																														res.render('error' , {'title' : 'Error' , 'error' : status});							});
	} , 

	'nameAnimalDelete' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}delete/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');
		
		axios.get(url , {
												'data' : {
																		'ethnic' : ethnic	,
																												'specie' : 'Animal' }		})
			.then((response) => { 	data = response.data;
																																		res.render('forms/delete_forms/name_delete' , {'title' : `Remove ${data.ethnic_group} ${modelType} - ${data.name}` , 'name' : data 	});		})
									.catch((err) => {			status = err.response;

										res.locals.breadcrumb.splice(4);
																																		res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameAnimalDeleteSubmit' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic;

			axios({  	'method': 'delete' ,
																		  'url' : `${nConfig.reqOptions.url}${name}`	, 'data' : {
																		  																													'ethnic' : ethnic ,
																																																										'specie' : 'Animal'	}		 })
			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/name');		})
			.catch((err) => {			status = err.response;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');

																														res.render('error' , {'title' : 'Error' , 'error' : status});			});
	} , 

	'namePlantDelete' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic , url = `${nConfig.reqOptions.url}delete/${name}`;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');
		
		axios.get(url , {
												'data' : {
																		'ethnic' : ethnic	,
																												'specie' : 'Plant' } })
			.then((response) => { 	data = response.data;
																																		res.render('forms/delete_forms/name_delete' , {'title' : `Remove ${data.ethnic_group} ${modelType} - ${data.name}` , 'name' : data 	});		})
									.catch((err) => {			status = err.response;

										res.locals.breadcrumb.splice(4);
																																		res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'namePlantDeleteSubmit' : (req , res , next) => {	name = req.params.name , ethnic = req.params.ethnic;

			axios({  	'method': 'delete' ,
																		  'url' : `${nConfig.reqOptions.url}${name}` , 'data' : {
																	  																													'ethnic' : ethnic ,
																																																									'specie' : 'Plant' 	}		})
			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect('/delete/name');		})
			.catch((err) => {			status = err.response;

		res.locals.breadcrumb[2]['url'] = res.locals.breadcrumb[2]['url'].replace('/delete' , '');

		res.locals.breadcrumb[3]['url'] = res.locals.breadcrumb[3]['url'].replace('/delete' , '');

		res.locals.breadcrumb[4]['url'] = res.locals.breadcrumb[4]['url'].replace('/delete' , '');

																														res.render('error' , {'title' : 'Error' , 'error' : status});			});
	} , 

	'nameVote' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Vote a Name' });
	} 
}