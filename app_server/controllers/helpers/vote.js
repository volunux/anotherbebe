var axios = require('axios') , pConfig = require('../../config/photo') , errors = '' , url = '' , data = '' , photo = '' , pParam = '' , comment = '';


module.exports = function(modelName , lModelName) {

var aConfig = require(`../../config/${lModelName}`);

	return {

	'entryVote' : (req , res , next) => {	photo = req.params.photo;

			axios({  	'method': 'post' ,
																		'url' : `${pConfig.reqOptions.url}d/${photo}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/photo/${data}`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryCommentVote' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment;

			axios({  	'method': 'post' ,
																		'url' : `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/photo/${data}/comment`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryReplyVote' : (req , res , next) => {	photo = req.params.photo , comment = req.params.comment , reply = req.params.reply;

			axios({  	'method': 'post' ,
																		'url' : `${pConfig.reqOptions.url}d/${photo}/comment/d/${comment}/reply/d/${reply}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/photo/${data}/comment`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryVoteArticle' : (req , res , next) => {	article = req.params.article;

			axios({  	'method': 'post' ,
																		'url' : `${aConfig.reqOptions.url}d/${article}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/${lModelName}/${data}`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryCommentVoteArticle' : (req , res , next) => {	article = req.params.article , comment = req.params.comment;

			axios({  	'method': 'post' ,
																		'url' : `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/${lModelName}/${data}/comment`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	} ,

	'entryReplyVoteArticle' : (req , res , next) => {	article = req.params.article , comment = req.params.comment , reply = req.params.reply;

			axios({  	'method': 'post' ,
																		'url' : `${aConfig.reqOptions.url}d/${article}/comment/d/${comment}/reply/d/${reply}/vote` })
			
			.then((response) => {		data = response.data.entry_slug;
																																res.redirect(`/${lModelName}/${data}/comment`)		})
			.catch((err) => {			status = err.response;

				res.locals.breadcrumb.splice(2);
																														res.render('error' , {'title' : 'Error' , 'error' : status 	});			});
	}

}

}