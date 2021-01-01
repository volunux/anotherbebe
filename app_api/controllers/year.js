var Year = require('../models/year') , config = require('../config/config') , async = require('async') , yValue = '' , year = '' , yParam = '';

module.exports = {

	'yearName' : (req , res) => {	year = req.params.year;
			
			Year.findOne({'year' : new RegExp(year , 'i')})
																											.exec((err , yearResult) => {

																														if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																												if (!yearResult) {
																																						config.response(res , 404 , {'message' : 'Year entry does not exist in the record or is not available.'});
																																																																																													return false;		}
																																						config.response(res , 200 , yearResult);					});
	} ,

	'yearList' : (req , res) => {	
			
			Year.find({})
										.exec((err , yearResult) => {
																													if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																						if (yearResult.length == 0) {
																																						config.response(res , 404 , {'message' : 'Year entries does not exist in the record or is not available.'});
																																																																																														return false;		}
																																						config.response(res , 200 , yearResult);				});
	} ,

	'yearDetail' : (req , res) => {		year = req.params.year;	

				if (req.params && req.params.year) {
																			
		Year.findOne({'year' : new RegExp(year , 'i')})
																										.exec((err , yearResult) => {

																									if (err) {
																																	config.compiledError(res , 400 , err);
																																																					return false;	}
																							if (!yearResult) {
																																	config.response(res , 404 , {'message' : 'Year entry does not exist in the record or is not available.'});
																																																																																								return false;		}
																																	config.response(res , 200 , yearResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No year id provided. Please provide a valid year id.'});		}
	} ,

	'yearAdd' : (req , res) => {	year = new Year(req.body);
			
			year.save((err , yearResult) => {
																				if (err) {
																										config.compiledError(res , 400 , err);
																																															return false;	}		
																										config.response(res , 200 , yearResult);									});
	} ,

	'yearUpdate' : (req , res) => {	yValue = req.body.year , year = req.params.year;

				if (req.params && req.params.year) {

				Year.findOne({'year' : new RegExp(year , 'i')} , (err , year) => {	if (!year) {	return config.response(res , 404 , {'message' : 'Year entry does not exist in the record or is not available.'});	}

				Year.findOneAndUpdate({'year' : new RegExp(year , 'i')} , 

									{'$set' : yValue} , {'new' : true , 'runValidators' : true} , (err , yearResult) => {
																																																					if (err) {																																													
																																																											config.compiledError(res , 400 , err);
																																																																																return false;	}
																																																											config.response(res , 201 , yearResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No year id provided. Please provide a valid year id.'});		}
	} ,

	'yearDelete' : (req , res) => {	year = req.params.year;

		if (req.params.year) {
				
				Year.findOne({'year' : new RegExp(year , 'i')} , (err , year) => {	if (!year) {	return config.response(res , 404 , {'message' : 'Year entry does not exist in the record or is not available.'});	}
														
														year.remove((err , yearResult) => {
																																if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;		}

																																		return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No year id provided. Please provide a valid year id.'});		}
	} 

}