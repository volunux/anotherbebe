const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

var Eyon = require('../../app_api/models/eyon') , Proverb = require('../../app_api/models/proverb') , eConfig = require('../config/eyon') , pConfig = require('../config/proverb') , axios = require('axios') , 

url = '' , data = '' , ethnic = '' , alpha = '' , gender = '' , proverb = '' , eyon = '' , nParam = '' , errors = '' , pUpdate = {} , cConfig = require('../config/country') , country = '' , countries = '' ,

errArr = '';

module.exports = {

	'proverbs' : (req , res , next) => { url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;

				console.log(req.app.get('arrr'));
																																						res.render('proverb/index' , { 'title': 'List of Proverbs of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Proverb entries not available' , 'error' : status 	})										});
	} ,

	'proverbDetail' : (req , res , next) => { ethnic = req.params.ethnic.toLowerCase() , url = `${pConfig.reqOptions.url}${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)} Proverb`;

			axios.get(url).then((response) => {	data = response.data.status;
																																						res.render('proverb/proverb_detail' , { 'title' : title , 'proverbs' : data 	});				})
										.catch((err) => {				status = err.response;
																																						res.render('error' , {'title' : 'Proverb entry not available' , 'error' : status 	})					});
	} ,

	'proverbAdd' : (req , res , next) => {	url = `${pConfig.reqOptions.url}add`;	

			axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon;
																																															res.render('forms/add_forms/proverb_add' , { 'title': 'Add a new Proverb'  , 'eyon' : eyon });		})
										.catch((err) => {				status = err.response;
																																															res.render('error' , {'title' : 'Error' , 'error' : status 	})								});
	} , 

	'proverbAddSubmit' :  [ 

				body('proverb'								,		'Proverb cannot be empty and should be provided.')	.isLength({ 'min' : 1 })
																																																												.withMessage('Proverb cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 200})
																																																												.withMessage('Proverb cannot be greater than 200 characters in length.')
																																															.trim() ,

				body('literal'								, 	'Literal Translation should be provided.')						.isLength({ 'min' : 1 })
																																																												.withMessage('Literal Translation cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 250})
																																																												.withMessage('Literal Translation cannot be greater than 250 characters in length.')
																																															.trim() ,

				body('meaning'								, 	'Meaning should be provided.')											.isLength({ 'min' : 1 })
																																																												.withMessage('Meaning cannot be less than 1 character in length.')
																																															.isLength({ 'max' : 250})
																																																												.withMessage('Meaning cannot be greater than 250 characters in length.')
																																															.trim() ,
				
				body('ethnic_group'					, 	'An Ethnic Group should be provided.')								.isLength({ 'min' : 1 }).trim(),

				sanitizeBody('*').trim() ,

				(req , res , next) => {	proverb = new Proverb(req.body);

				errors = validationResult(req);

								if (!errors.isEmpty()) {		url = `${pConfig.reqOptions.url}add`;	

													axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon;

																					res.render('forms/add_forms/proverb_add' , {'title' : 'Add a Proverb',	'proverb' : proverb , 'eyon' : eyon , 'errors' : errors.array()			}); });		}
        							else {
															axios({  	'method': 'post' ,
																											  		'url' : pConfig.reqOptions.url ,
															  															 																'data' : req.body 	})
																			.then((response) => {		
																																										res.redirect('/');		})
																			.catch((err) => {		errors = [];
																																				if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${pConfig.reqOptions.url}add`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon;
																																																											clientErr.formAdd(err , errors);
																			
															res.render('forms/add_forms/proverb_add' , { 'title': 'Add a new Proverb' , 'eyon' : eyon , 'proverb' : proverb , 'errors' : errors });		});
																																																																																							return false;			}			
																													status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
        														}																																																	
	}] , 

	'proverbUpdate' : (req , res , next) => {	proverb = req.params.proverb , url = `${pConfig.reqOptions.url}${proverb}/update`;

		axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon;

																																	res.render('forms/add_forms/proverb_add' , { 'title': 'Update a Proverb' , 'eyon' : eyon , 'proverb' : proverb 	});			})
									.catch((err) => {		status = err.response;
																																	res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'proverbUpdateSubmit' : [


				body('proverb'								,		'Proverb cannot be empty and should be provided.')					.isLength({ 'min' : 1 })
																																																															.withMessage('Proverb cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 250})
																																																															.withMessage('Proverb cannot be greater than 250 characters in length.')
																																																			.trim() ,

				body('literal'								, 	'Literal Translation should be provided.')										.isLength({ 'min' : 1 })
																																																															.withMessage('Literal Translation cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 250})
																																																															.withMessage('Literal Translation cannot be greater than 250 characters in length.')
																																																			.trim() ,

				body('meaning'								, 	'Meaning should be provided.')															.isLength({ 'min' : 1 })
																																																															.withMessage('Meaning cannot be less than 1 character in length.')
																																																			.isLength({ 'max' : 250})
																																																															.withMessage('Meaning cannot be greater than 250 characters in length.')
																																																			.trim() ,
				
				body('ethnic_group'					, 	'An Ethnic Group cannot be empty and should be provided.')		.isLength({ 'min' : 1 }).trim() ,

				sanitizeBody('*').trim() ,
				
				(req , res , next) => {			proverb = new Proverb(req.body) , nParam = req.params.proverb;

				 errors = validationResult(req);

								if (!errors.isEmpty()) {	url = `${pConfig.reqOptions.url}add`;	

											axios.get(url).then((response) => {		data = response.data.status ,	eyon = data.Eyon;

																					res.render('forms/add_forms/proverb_add' , {'title' : 'Update a Name',	'proverb' : proverb , 'eyon' : eyon , 'errors' : errors.array()			});			}); }
        							else {
															axios({  	'method': 'put' ,
																												  'url' : `${pConfig.reqOptions.url}${nParam}`,
																								  																 											'data' : req.body 	})
															.then((response) => {		
																																										res.redirect('/proverb/');		})
															.catch((err) => {			errors = [];
																																	if (err.response.status == 400 || err.response.statusText == 'Bad Request') { 	url = `${pConfig.reqOptions.url}${lParam}/update`;
																																					
															axios.get(url).then((response) => { 	data = response.data.status ,	eyon = data.Eyon;
																																																											clientErr.formAdd(err , errors);
																			
															res.render('forms/add_forms/proverb_add' , { 'title': `Update ${pUpdate.title}` , 'eyon' : eyon , 'proverb' : proverb , 'errors' : errors });		})
																																																																																												return;		}
																														status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	});		});				}
    }]	, 

	'proverbDelete' : (req , res , next) => {	proverb = req.params.proverb , url = `${lConfig.reqOptions.url}${proverb}`;
		
		axios.get(url).then((response) => { 	data = response.data.status;
																																				if (!data) {
																																																					return;		}
																																				else {
																																										res.render('forms/delete_forms/proverb_delete' , {'title' : 'Remove Proverb' , 'proverb' : data 	});			}})
									.catch((err) => {				status = err.response;
																																										res.render('error' , {'title' : 'Error' , 'error' : status 	})				});
	} , 

	'proverbDeleteSubmit' : (req , res , next) => {	proverb = req.params.proverb;

			axios({  	'method': 'delete' ,
																		  'url' : `${lConfig.reqOptions.url}${proverb}` })
			.then((response) => {		
																														res.redirect('/proverb/');		})
			.catch((err) => {			status = err.response;
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});											});
	}

}