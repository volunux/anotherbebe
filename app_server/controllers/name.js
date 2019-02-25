const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Alphabet = require('../../app_api/models/alphabet') , Gender = require('../../app_api/models/gender') , Baby = require('../../app_api/models/baby') , 

async = require('async') , axios = require('axios') , Name = require('../../app_api/models/name') , eConfig = require('../config/eyon') , nConfig = require('../config/name') ,

url = '' , data = '' , ethnic = '' , alpha = '' , gender = '' , name = '' , eyon = '' , nParam = '';

module.exports = {

	'names' : (req , res , next) => { url = String(eConfig.reqOptions.url);

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('name/ethnic_names_index' , { 'title': 'List of Names by Ethnic Groups' , 'eyons' : data});				})
	} ,

	'nameEthnic' : (req , res , next) => { eyon = req.params.ethnic.toLowerCase() , title = String('List of ' + eyon[0].toUpperCase() + eyon.slice(1) + ' Names Alphabet');

																										res.render('name/ethnic_name_alphabet' , {'title' : title , 'eyon' : eyon})
	} ,

	'nameByAlphabet' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , alpha = req.params.alphabet.toLowerCase() , url = String(nConfig.reqOptions.url + ethnic + '/alphabet/' + alpha) ,

																							title = String(ethnic[0].toUpperCase() + ethnic.slice(1) + ' Names under Alphabet ' + alpha.toUpperCase());

			axios.get(url).then((response) => {	data = response.data.status;

					res.render('name/ethnic_names_alphabet_detail' , { 'title': title , 'names' : data , 'eyon' : ethnic , 'alpha' : alpha});		})
											
										.catch((err) => {			status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status});													});
	} , 

	'nameGender' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , gender = req.params.gender.toLowerCase() , url = String(nConfig.reqOptions.url + ethnic + '/gender/' + gender) ,

																					title = String(ethnic[0].toUpperCase() + ethnic.slice(1) + ' Names for ' + gender[0].toUpperCase() + gender.slice(1));

			axios.get(url).then((response) => {	data = response.data.status;

				console.log(data);

					res.render('name/ethnic_names_gender_detail' , { 'title': title , 'names' : data});		})
	} , 

	'nameDetail' : (req , res , next) => { 	name = req.params.name , url = String(nConfig.reqOptions.url + name)

				axios.get(url).then((response) => {	data = response.data.status , title = data.ethnic_group.eyon + ' name ' + data.name

																									  res.render('name/name_detail' , { 'title': title , 'details' : data });
				})			
											.catch((err) => {			status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status});													});
	} , 

	'nameAdd' : (req , res , next) => {	url = String(nConfig.reqOptions.url + 'add');

			axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender;
																					
																						res.render('forms/add_forms/name_add' , { 'title': 'Add a new Name'  , gender : gender , eyon : eyon , alphabet : alphabet , baby : baby });			})
										
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Error' , 'error' : status})																										});
	} , 

	'nameAddSubmit' :  [

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('definition'								, 	'Defintion must be provided.')									.isLength({ min: 1 }).trim(),	
				body('morphology'								, 	'Morphology must be provided.')									.isLength({ min: 1 }).trim(),	
				body('gloss'										, 	'Gloss must be provided.')											.isLength({ min: 1 }).trim(),


				(req , res , next) => {	name = new Name(req.body);

				const errors = validationResult(req);

								if (!errors.isEmpty()) {																												
																					res.render('forms/add_forms/name_add' , {'title' : 'Add a Name',	'name' : name , 'errors' : errors.array()			});
        																																																																								}
        							else {
															url = String(nConfig.reqOptions.url + 'name/' + name.name);
												
															axios.get(url)
																						.then((response) => { 	name = response.data.status;
																																																	if (name) {
																																																								res.redirect('/name/' + name.name);
																																																																												return;	}
																						})
																						
																						.catch((err) => {
																																axios({  	'method': 'post' ,
																																												  		'url' : nConfig.reqOptions.url ,
																																  															 																'data' : req.body 	})
																							.then((response) => {		
																																																		res.redirect('/name/');		})
																							.catch((err) => {			
																																		status = err.response;
																																																		res.render('error' , {'title' : 'Error' , 'error' : status});		});
																																										});
        														}																																																	
	}], 

	'nameUpdate' : (req , res , next) => {	name = req.params.name , url = String(nConfig.reqOptions.url + name + '/update');

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon ,	alphabet = data.Alphabet , baby = data.Baby , gender = data.Gender , name = data.Name

																						res.render('forms/add_forms/name_add' , { 'title': 'Update a Name'  , gender : gender , eyon : eyon , alphabet : alphabet , baby : baby , name : name});	})
										
									.catch((err) => {				status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameUpdateSubmit' : [

				body('name'											,		'Name must not be empty.')											.isLength({ min: 3 }).trim(),
				body('definition'								, 	'Defintion must be provided.')									.isLength({ min: 1 }).trim(),	
				body('morphology'								, 	'Morphology must be provided.')									.isLength({ min: 1 }).trim(),	
				body('gloss'										, 	'Gloss must be provided.')											.isLength({ min: 1 }).trim(),

				sanitizeBody('*').trim().escape(),
				
				(req , res , next) => {			name = new Name(req.body) , nParam = req.params.name;

				const errors = validationResult(req);

								if (!errors.isEmpty()) {																												
																					res.render('forms/add_forms/name_add' , {'title' : 'Update a Name',	'name' : name , 'errors' : errors.array()			});
        																																																																								}
        							else {
															axios({  	'method': 'put' ,
																												  'url' : nConfig.reqOptions.url + nParam,
																								  																 									'data' : req.body 	})
															.then((response) => {		
																																										res.redirect('/name/');		})
															.catch((err) => {			status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status});		});
        														}
        		}]		
	 , 

	'nameDelete' : (req , res , next) => {	name = req.params.name , url = String(nConfig.reqOptions.url + 'name/' + name);
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																											console.log(data);
																																																					return;		}
																																						else {
																																										res.render('forms/delete_forms/name_delete' , {'title' : 'Remove Name' , 'name' : data});
																																																																																				}})
									.catch((err) => {				status = err.response;
																																					res.render('error' , {'title' : 'Error' , 'error' : status})	});
	} , 

	'nameDeleteSubmit' : (req , res , next) => {	name = req.params.name;

			axios({  	'method': 'delete' ,
																		  'url' : nConfig.reqOptions.url + name	})
			.then((response) => {		
																														res.redirect('/name/');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status});																										});
	} , 

	'nameVote' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Vote a Name' });
	} , 
}