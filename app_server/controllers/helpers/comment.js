const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

module.exports = function(modelName , lModelName) {

var eConfig = require('../../config/eyon') , cConfig = require('../../config/country') , aConfig = require(`../../config/${lModelName}`) , pConfig = require('../../config/photo') , axios = require('axios') , 

errHandler = require('./compiledError') , url = '' , data = '' , ethnic = '' , article =  '' , eyon = '' , aParam = '' ,  

errors = '' , errArr = '' , modelType = modelName , modelTypes = `${modelName}s` , lModelType = lModelName , lModelTypes = `${lModelName}s`;

return {

	'entryComment' : (req , res , next) => { var photo = req.params.photo , url = `${pConfig.reqOptions.url}d/${photo}/comment`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comments , breadcrumb = res.locals.breadcrumb , finalB = breadcrumb[breadcrumb.length - 2];

																																		res.locals.breadcrumb[breadcrumb.length - 2] = {
																																																											'label' : data.photo.title ,

																																																											'url' : finalB.url };

																																		res.render('comment/list_comment' , {'title' : data.photo.title , 'comments' : comment , 'photo' : photo})		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2 , 2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryCommentDetail' : (req , res , next) => { var photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb.pop() , finalB = breadcrumb[breadcrumb.length - 2] , 

										finalC = res.locals.breadcrumb[2]; 
																												res.locals.breadcrumb[res.locals.breadcrumb.length - 2] = {
																																																											'label' : data.photo.title ,

																																																											'url' : finalC.url };

																																		res.render('comment/comment_detail' , {'title' : data.photo.title , 'comment' : comment , 'photo' : photo})		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryAddComment' : (req , res , next) => {	 photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/add`;

				axios.get(url)
												.then((response) => { data = response.data , breadcrumb = res.locals.breadcrumb , finalC = breadcrumb[breadcrumb.length - 3].url;

																																		res.locals.breadcrumb[breadcrumb.length - 3] = {
																																																											'label' : data.title ,

																																																											'url' : finalC };

																																		res.render('forms/add_forms/comment_add' , {'title' : data.title })		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddCommentSubmit' : [

			body('text' , 'Comment body should be provided and cannot be empty.')		.isLength({ 'min' : 4 })
																																																				.withMessage('Comment body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Comment body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , photo = req.params.photo , url = `${pConfig.reqOptions.url}d/${photo}/comment/add`;

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

														res.locals.breadcrumb.splice(2);
																																	res.render('error' , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${pConfig.reqOptions.url}d/${photo}/comment` ,
																					  															 																'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/photo/${photo}/comment`);		})
														.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																							res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryCommentUpdate' : (req , res , next) => { photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/update`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

		axios.get(url)
									.then((response) => { data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.photo.title ,

																																																									'url' : finalB.url };

																																res.render('forms/add_forms/comment_add' , {'title' : `Update Comment : ${data.photo.title}` , 'comment' : data });		})
									.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryCommentUpdateSubmit' : [

			body('text' , 'Comment body should be provided cannot be empty.')			.isLength({ 'min' : 4 })
																																																			.withMessage('Comment body cannot be less than 5 characters in length.')
																																						.isLength({ 'max' : 700 })
																																																			.withMessage('Comment body cannot be greater than 700 characters in length.')	,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , photo = req.params.photo , cParam = req.params.comment;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) { finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

										axios.get(url)
																	.then((response) => { data = response.data;
																																										res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																																
																																																																	'label' : data.photo.title ,

																																																																	'url' : finalB.url };

																																res.render('forms/add_forms/comment_add' , {'title' : `Update Comment : ${data.photo.title}` , 'comment' : comment , 'errors' : errArr });		})
									.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${pConfig.reqOptions.url}d/${photo}/comment/d/${cParam}` ,
																					  															 																						'data' : comment 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/photo/${photo}/comment`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${pConfig.reqOptions.url}d/${photo}/comment/${cParam}/update`;
					return axios.get(url)
																.then((response) => { data = response.data , finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

																																		errHandler.formAdd(err , errors);

																																						res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																												
																																																													'label' : data.photo.title ,

																																																													'url' : finalB.url };
															
									return res.render('forms/add_forms/comment_add' , { 'title': `Update Comment : ${data.photo.title}` , 'comment' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			})

													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			});  	}

																						status = err.response;
																																			res.render('error' , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryCommentDelete' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/delete`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data.photo.title ,

																																																									'url' : finalB.url };

																																		res.render('forms/delete_forms/comment_delete' , {'title' : `Remove Comment : ${data.photo.title}` , 'comment' : data 	});			})
									.catch((err) => {				status = err.response;

										res.locals.breadcrumb.splice(2);
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryCommentDeleteSubmit' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment , url = `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/photo/${photo}`);
																																								/*res.redirect('/delete/photo');*/		})
			.catch((err) => {			status = err.response;

							res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});		});
	} ,

	'entryCommentArticle' : (req , res , next) => { var article =  req.params.article , url = `${aConfig.reqOptions.url}d/${article}/comment`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comments , breadcrumb = res.locals.breadcrumb , finalB = breadcrumb[breadcrumb.length - 2];

																																		res.locals.breadcrumb[breadcrumb.length - 2] = {
																																																											'label' : data[lModelType].title ,

																																																											'url' : finalB.url };

																																		res.render(`comment/${lModelType}_comment` , {'title' : data[lModelType].title , 'comments' : comment , [lModelType] : article})		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2 , 2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryCommentDetailArticle' : (req , res , next) => { article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}`;

				axios.get(url)
												.then((response) => { data = response.data , comment = data.comment , breadcrumb = res.locals.breadcrumb.pop() , finalB = breadcrumb[breadcrumb.length - 2] , 

				finalC = res.locals.breadcrumb[2]; 
																												res.locals.breadcrumb[res.locals.breadcrumb.length - 2] = {
																																																											'label' : data[lModelType].title ,

																																																											'url' : finalC.url };

																																		res.render(`comment/comment_detail` , {'title' : data[lModelType].title , 'comment' : comment , [lModelType] : article})		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryAddCommentArticle' : (req , res , next) => {	 article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/add`;

				axios.get(url)
												.then((response) => { data = response.data , breadcrumb = res.locals.breadcrumb , finalC = breadcrumb[breadcrumb.length - 3].url;

																																		res.locals.breadcrumb[breadcrumb.length - 3] = {
																																																											'label' : data.title ,

																																																											'url' : finalC };

																																		res.render(`forms/add_forms/comment_add` , {'title' : data.title })		})
													.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryAddCommentSubmitArticle' : [

			body('text' , 'Comment body should be provided and cannot be empty.')		.isLength({ 'min' : 4 })
																																																				.withMessage('Comment body cannot be less than 5 characters in length.')
																																							.isLength({ 'max' : 700 })
																																																				.withMessage('Comment body cannot be greater than 700 characters in length.') ,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , article =  req.params.article , url = `${aConfig.reqOptions.url}d/${article}/comment/add`;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {

				axios.get(url)
												.then((response) => { data = response.data , breadcrumb = res.locals.breadcrumb , finalB = breadcrumb[breadcrumb.length - 3];

																																		res.locals.breadcrumb[breadcrumb.length - 3] = {
																																																											'label' : data.title ,

																																																											'url' : finalB.url };

																																	res.render(`forms/add_forms/comment_add` , {'title' : data.title , 'errors' : errArr , 'comment' : comment })		})
												.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																	res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});			}	
						else {
										axios({  	'method': 'post' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${article}/comment` ,
																					  															 																	'data' : req.body 	})
														.then((response) => {		data = response.data;
																																							res.redirect(`/${lModelType}/${article}/comment`);		})
														.catch((err) => {	status = err.response;

														res.locals.breadcrumb.splice(2);
																																							res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});			}			}
	] ,

	'entryCommentUpdateArticle' : (req , res , next) => { article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/update`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

				axios.get(url)
											.then((response) => { data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data[lModelType].title ,

																																																									'url' : finalB.url };

																																res.render(`forms/add_forms/comment_add` , {'title' : `Update Comment : ${data[lModelType].title}` , 'comment' : data });		})
									.catch((err) => {		status = err.response;

														res.locals.breadcrumb.splice(2);
																																res.render(`error` , {'title' : 'Error' , 'error' : status 	});				});
	} ,

	'entryCommentUpdateSubmitArticle' : [

			body('text' , 'Comment body should be provided cannot be empty.')			.isLength({ 'min' : 4 })
																																																			.withMessage('Comment body cannot be less than 5 characters in length.')
																																						.isLength({ 'max' : 700 })
																																																			.withMessage('Comment body cannot be greater than 700 characters in length.')	,
			sanitizeBody('*').trim() ,

			(req , res , next) => { var comment = req.body , article =  req.params.article , cParam = req.params.comment;

					errors = validationResult(req);

					errArr = errors.array();

				if (errArr.length != 0) {  finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

							axios.get(url)
														.then((response) => { data = response.data;
																																							res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																													
																																																														'label' : data[lModelName].title ,

																																																														'url' : finalB.url };

																													res.render('forms/add_forms/comment_add' , {'title' : `Update Comment : ${data[lModelName].title}` , 'comment' : comment , 'errors' : errArr });		})
							.catch((err) => {		status = err.response;

											res.locals.breadcrumb.splice(2);
																																res.render('error' , {'title' : 'Error' , 'error' : status 	});				});		}	
						else {
										axios({  	'method': 'put' ,
																						  		'url' : `${aConfig.reqOptions.url}d/${article}/comment/d/${cParam}` ,
																					  															 																						'data' : comment 	})
														.then((response) => {		data = response.data;
																																									res.redirect(`/${lModelType}/${article}/comment`);		})
														.catch((err) => { 		errors = [];
																																	if (err.response.status == 400) { 	url = `${aConfig.reqOptions.url}d/${article}/comment/${cParam}/update`;
	return axios.get(url)
												.then((response) => { data = response.data , finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

																																		errHandler.formAdd(err , errors);

																																						res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																												
																																																													'label' : data[lModelType].title ,

																																																													'url' : finalB.url };
															
						return res.render(`forms/add_forms/comment_add` , { 'title': `Update Comment : ${data[lModelType].title}` , 'comment' : data , 'errors' : errors , 'rmethod' : 'PUT' 	});			})

													.catch((err) => {	status = err.response;
																																		res.render('error' , {'title' : 'Error' , 'error' : status 	});			}); 	 	}
																						status = err.response;
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	});			});			}			}
	] ,

	'entryCommentDeleteArticle' : (req , res , next) => {	article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/delete`;

	finalB = res.locals.breadcrumb[2] , breadcrumb = res.locals.breadcrumb.splice(4 , 1);

		axios.get(url)
									.then((response) => { 	data = response.data;
																																		res.locals.breadcrumb[res.locals.breadcrumb.length - 3] = {
																																																								
																																																									'label' : data[lModelType].title ,

																																																									'url' : finalB.url };

																																		res.render(`forms/delete_forms/comment_delete` , {'title' : `Remove Comment ${data[lModelType].title}` , 'comment' : data 	});			})
									.catch((err) => {				status = err.response;

											res.locals.breadcrumb.splice(2);
																																		res.render(`error` , {'title' : 'Error' , 'error' : status 	})	});
	} , 

	'entryCommentDeleteSubmitArticle' : (req , res , next) => {	article =  req.params.article , comment = req.params.comment , url = `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}`;

			axios({  	'method': 'delete' ,
																		  'url' : url })

			.then((response) => {		req.flash('info', 'Entry successfully deleted.');
																																								res.redirect(`/${lModelType}/${article}`);
																																								/*res.redirect('/delete/art');*/		})
			.catch((err) => {			status = err.response;

							res.locals.breadcrumb.splice(2);
																														res.render(`error` , {'title' : 'Error' , 'error' : status 	});		});
	}

}

}