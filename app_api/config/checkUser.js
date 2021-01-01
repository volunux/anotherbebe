module.exports = {

	'isUser' : function(dbModel , prop , urlParam) {	dataUrl = req.params.art;

			dbModel.findOne({'url' : dataUrl})
																				.exec((err , dataResult) => {
																																			if (err) {
																																									return config.compiledError(res , 400 , err);		}

																																			if (dataResult.author._id != req.user._id || req.user.role != 'admin' || req.user.role != 'superAdmin') {

																																																										return config.response(res , 403 , 'An Unauthorized and forbidden access.');	}
																												next();		})
	} ,

	'permit' : (...allowed) => {
  															const isAllowed = (role) => {
  																															allowed.indexOf(role) > -1;	}

															  return (req , res , next) => {
   																														 if (req.user && isAllowed(req.user.role)) {	
   																														 																							return next(); 
   																														 }   
    																															else {
																																					return config.response(res , 403 , 'An Unauthorized and forbidden access.');		 }	}
							}
}