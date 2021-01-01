const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

module.exports = function(modelName , lModelName) {

const $Model = require('../../../app_api/models/models')[modelName];

var eConfig = require('../../config/eyon') , cConfig = require('../../config/country') , aConfig = require(`../../config/${lModelName}`) , pConfig = require('../../config/photo') , axios = require('axios') , 

errHandler = require('./compiledError') , url = '' , data = '' , ethnic = '' , article =  '' , eyon = '' , aParam = '' ,  

country = '' , century = '' , region = '' , continent = '' , errors = '' , errArr = '' , modelType = modelName , modelTypes = `${modelName}s` , lModelType = lModelName , lModelTypes = `${lModelName}s`;

return {

	'entryAddReply' : (req , res , next) => {	 photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/add`;

																							finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);
				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb;

																																		res.locals.breadcrumb[2] = {
																																																'label' : data.photo.title ,

																																																'url' : finalB.url };

																																		res.render('forms/add_forms/helpers/reply_add' , {'title' : `Add Reply ${data.photo.title}` , 'comment' : comment })		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddReplySubmit' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 4 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/add`;

															finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb , res.locals.breadcrumb[2] = {
																																																																																'label' : data.photo.title ,

																																																																																'url' : finalB.url };

																					res.render('forms/add_forms/helpers/reply_add' , {'title' : `Add Reply ${data.photo.title}` , 'comment' : comment , 'errors' : errArr , 'reply' : reply  })		})
						
						.catch((err) => {	status = err.response;

							res.locals.breadcrumb.splice(2);
																					
																					res.render('error' , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply` ,
																					  															 																										'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/photo/${photo}/comment`);		})
														.catch((err) => {	status = err.response;
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyUpdate' : (req , res , next) => { 	photo = req.params.photo , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${reply}/update`;
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data.photo.title ,

																																																																			'url' : finalB.url };

																															res.render('forms/add_forms/helpers/reply_add' , {'title' : `Update Reply : ${data.photo.title}` , 'reply' : data  , 'comment' : comment 	});		})
									.catch((err) => {		status = err.response;

										res.locals.breadcrumb.splice(2);
																															res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryReplyUpdateSubmit' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 4 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , photo = req.params.photo , comment = req.params.comment , rParam = req.params.reply;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {		url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${rParam}/update` , finalB = res.locals.breadcrumb[2] ,

																		breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data.photo.title ,

																																																																			'url' : finalB.url };

																			res.render('forms/add_forms/helpers/reply_add' , {'title' : `Update Reply : ${data.photo.title}` , 'errors' : errArr  , 'comment' : comment , 'reply' : reply	});		})

									.catch((err) => {		status = err.response;

										res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});		}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${rParam}` ,
																					  																									 																						'data' : reply 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/photo/${photo}/reply`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${rParam}/update` ,

																																																			finalB = res.locals.breadcrumb[2] ,	breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		return	axios.get(url)
													.then((response) => { data = response.data , comment = data.comment;
																																																res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																					
																																																																						'label' : data.photo.title ,

																																																																						'url' : finalB.url };
																																		errHandler.formAdd(err , errors);

					return res.render('forms/add_forms/reply_add' , { 'title': `Update Reply : ${data.photo.title}` , 'comment' : comment , 'reply' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			})

													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});  	}
																						status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyDelete' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${reply}/delete`;
		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.photo.title ,

																																																									'url' : finalB.url };

																																		res.render('forms/delete_forms/helpers/reply_delete' , {'title' : `Remove Reply : ${data.photo.title}` , 'reply' : data 	});			})
									.catch((err) => {		status = err.response;

										res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryReplyDeleteSubmit' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${reply}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/photo/${photo}/comment`);
																																								/*res.redirect('/delete/photo');*/		})
			.catch((err) => {			status = err.response;

										res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	} ,

	'entryAddReplyArticle' : (req , res , next) => {	 article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/add`;

																							finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);
				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb;

																																		res.locals.breadcrumb[2] = {
																																																'label' : data[lModelType].title ,

																																																'url' : finalB.url };

																																		res.render(`forms/add_forms/helpers/reply_add` , {'title' : `Add Reply ${data[lModelType].title}` , 'comment' : comment })		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddReplySubmitArticle' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 5 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/add`;

															finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 2);

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb , res.locals.breadcrumb[2] = {
																																																																																'label' : data[lModelType].title ,

																																																																																'url' : finalB.url };

																					res.render(`forms/add_forms/helpers/reply_add` , {'title' : `Add Reply ${data[lModelType].title}` , 'comment' : comment , 'errors' : errArr , 'reply' : reply  })		})
						
						.catch((err) => {	status = err.response;

							res.locals.breadcrumb.splice(2);
																					
																					res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply` ,
																					  															 																										'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/${lModelType}/${article}/comment`);		})
														.catch((err) => {	status = err.response;
																																							res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyUpdateArticle' : (req , res , next) => { 	article =  req.params.article , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${reply}/update`;
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data[lModelType].title ,

																																																																			'url' : finalB.url };

																												res.render(`forms/add_forms/helpers/reply_add` , {'title' : `Update Reply : ${data[lModelType].title}` , 'reply' : data  , 'comment' : comment 	});		})
						.catch((err) => {		status = err.response;

							res.locals.breadcrumb.splice(2);
																																res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryReplyUpdateSubmitArticle' : [

			body('text' , 'Reply body should be provided and cannot be empty.')			.isLength({ 'min' : 4 })
																																																				.withMessage('Reply body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Reply body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var reply = req.body , article =  req.params.article , comment = req.params.comment , rParam = req.params.reply;

					errors = validationResult(req);

					errArr = errors.array();

			if (errArr.length != 0) {	url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${rParam}/update` , finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		
		axios.get(url)
									.then((response) => { data = response.data , comment = data.comment;
																																												res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																		
																																																																			'label' : data[lModelType].title ,

																																																																			'url' : finalB.url };

																			res.render(`forms/add_forms/helpers/reply_add` , {'title' : `Update Reply : ${data[lModelType].title}` , 'errors' : errArr  , 'comment' : comment , 'reply' : reply	});		})

									.catch((err) => {		status = err.response;

										res.locals.breadcrumb.splice(2);
																																res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});		}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${rParam}` ,
																					  																									 																						'data' : reply 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/${lModelType}/${article}/comment`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${rParam}/update` ,

																																																			finalB = res.locals.breadcrumb[2] ,	breadcrumb = res.locals.breadcrumb.splice(4 , 3);
		return	axios.get(url)
													.then((response) => { data = response.data , comment = data.comment;
																																																	res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																					
																																																																						'label' : data[lModelType].title ,

																																																																						'url' : finalB.url };
																																		errHandler.formAdd(err , errors);
															
					return res.render(`forms/add_forms/reply_add` , { 'title': `Update Reply : ${data[lModelType].title}` , 'comment' : comment , 'reply' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			})

													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			}); 	 	}
																						status = err.response;
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryReplyDeleteArticle' : (req , res , next) => {	article =  req.params.article , comment = req.params.comment , reply = req.params.reply , finalB = res.locals.breadcrumb[2] ,

																								breadcrumb = res.locals.breadcrumb.splice(4 , 3) , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${reply}/delete`;
		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data[lModelType].title ,

																																																									'url' : finalB.url };

																																		res.render(`forms/delete_forms/helpers/reply_delete` , {'title' : `Remove Reply ${data[lModelType].title}` , 'reply' : data 	});			})
									.catch((err) => {				status = err.response;

										res.locals.breadcrumb.splice(2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryReplyDeleteSubmitArticle' : (req , res , next) => {	article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${reply}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/${lModelType}/${article}/comment`);
																																								/*res.redirect('/delete/art');*/		})
			.catch((err) => {			status = err.response;

										res.locals.breadcrumb.splice(2);
																														res.render(`error` , {'title' : 'Error' , 'error' : status 	});		});
	}

}

}