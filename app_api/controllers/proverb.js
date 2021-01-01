var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Proverb = require('../models/proverb') , config = require('../config/config') , proverb = '' , pValue = '' , pParam = '' , 

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'proverbName' : (req , res) => {		proverb = req.params.proverb;
	
		Proverb.findOne({'proverb' : new RegExp(proverb , 'i')})
																														.exec((err , proverbResult) => {

																												if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;		}
																										if (!proverbResult) {
																																						config.response(res , 404 , {'message' : 'Proverb entry does not exist in the record or is not available.'});
																																																																																													return false;	}
																																						config.response(res , 200 , proverbResult);						});
	} ,

	'proverbs' : (req , res , next) => {

		Proverb.find({})
											.exec((err , proverbResult) => {
																												if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																					if (proverbResult.length == 0) {
																																						config.response(res , 404 , {'message' : 'Proverb entries does not exist in the record or is not available.'});
																																																																																														return false;	}
																																						config.response(res , 200 , proverbResult);				});
	} , 

	'proverbByAlphabet' : (req , res , next) => {	ethnic = req.params.ethnic.toLowerCase() , alpha = req.params.alphabet.toLowerCase();
		
		async.waterfall([
				
				(callback) => {
																				Eyon.find({'eyon' : new RegExp(ethnic, 'i')})
																																																		.exec((err , ethnicResult) => {
																																																																						callback(null , ethnicResult);	});	
																																													},
				(arg1 , callback) => {
																				Alphabet.findOne({'alphabet' : new RegExp(alpha, 'i')})
																																																		.exec((err , alphabetResult) => {
																																																																						callback(null , alphabetResult , arg1);	});
																																													},
				(arg2 , arg1 , callback) => {		ethnic = arg1[0]['_id'] , alpha = arg2['_id'];

																				Proverb.find({'ethnic_group' : ethnic , 'alphabet' : alpha})
																																																		.exec((err , proverbResult) => {
																																																																						callback(null , proverbResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.compiledError(res , 400 , err);
																																														return false;		}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Proverbs not available under this alphabet.'});
																																																																										return false;		}
																												config.response(res , 200 , finalResult);
											});
	} , 
		
	'proverbDetail' : (req , res , next) => {	ethnic = req.params.ethnic;

							async.parallel({
																									'Eyon' : (callback) => {
																																						Eyon.findOne({'eyon' : new RegExp(ethnic , 'i')})
																																																																.exec(callback);
																									}
			} , (err , result) => {	

				if (result) {
											 eyonId = result.Eyon;
					}
																		if (err) {
																												config.compiledError(res , 400 , err);
																																																return false;		}
																		if (!result) {
																												config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																																return false;		}
											if (result.Eyon.length == 0) {
																											config.response(res , 404 , {'message' : 'Ethnic Group entries does not exist in the record or is not available.'});
																																																																																						return false;		}
					if (eyonId) {

						Proverb.find({'ethnic_group' : eyonId._id})
																												.exec((err , proverbResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (proverbResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No proverb entries available for this ethnic group.'});
																																																																																									return false;		}
																																								config.response(res , 200 , proverbResult);		})	}		});
	} , 

	'proverbAdd' : (req , res , next) => {
		
			async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									}
			} , (err , result) => {	
																		if (err) {
																											config.compiledError(res , 400 , err);
																																															return false;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																															return false;		}
											if (result.Eyon.length == 0) {
																											config.response(res , 404 , {'message' : 'Ethnic Group entries does not exist in the record or is not available.'});
																																																																																						return false;		}
																											config.response(res , 200 , result);					});
	} , 

	'proverbAddSubmit' : (req , res , next) => {	proverb = new Proverb(req.body);

		proverb.save((err , proverbResult) => {
																						if (err) {
																															config.compiledError(res , 400 , err);
																																																			return false;
																										}	else {
																															config.response(res , 200 , proverbResult);		}						});
	} , 

	'proverbUpdate' : (req , res , next) => {	proverb = req.params.proverb

		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Proverb' : (callback) => {
																																											Proverb.findOne({'proverb' : new RegExp(proverb, 'i')})
																																																																							.exec(callback) 
																									}	
			} , (err , result) => {	
																		if (err) {
																														config.compiledError(res , 400 , err);
																																																		return false;		}
																		if (!result) {
																														config.response(res , 404 , {'message' : 'Data entry cannot be retrieved.'});
																																																																					return false;		}
											if (result.Eyon.length == 0) {
																											config.response(res , 404 , {'message' : 'Ethnic Group entries does not exist in the record or is not available.'});
																																																																																						return false;		}
										if (result.Country.length == 0) {
																											config.response(res , 404 , {'message' : 'Country entries does not exist in the record or is not available.'});
																																																																																			return false;		}
																		if (!result.Proverb) {
																														config.response(res , 404 , {'message' : 'Proverb entry does not exist in the record or is not available.'});
																																																																																					return false;		}
																														config.response(res , 200 , result);			});
	} , 

	'proverbUpdateSubmit' : (req , res , next) => {	pValue = req.body , pParam = req.params.proverb;

				if (req.params && req.params.proverb) {

				Proverb.findOne({'proverb' : new RegExp(proverb , 'i')} , (err , proverb) => {
																																						
																																						if (!proverb) {	return config.response(res , 404 , {'message' : 'Proverb entry does not exist in the record or is unavailable.'});	}
				Proverb.findOneAndUpdate({'proverb' : new RegExp(proverb , 'i')} , 

							{'$set' : pValue} , {'new' : true , 'runValidators' : true} , (err , proverbResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																																return false;	}
																																																										config.response(res , 201 , proverbResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No proverb id provided. Please provide a valid proverb id.'});		}
	} , 

	'proverbDelete' : (req , res , next) => {	proverb = req.params.proverb;
		
		if (req.params.proverb) {
				
				Proverb.findOne({'proverb' : new RegExp(proverb , 'i')} , (err , proverb) => {
																			
																																							if (!proverb) {	return config.response(res , 404 , {'message' : 'Proverb entry does not exist in the record or is unavailable.'});	}
														proverb.remove((err , proverbResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No proverb id provided. Please provide a valid proverb id.'});		}
	} , 

	'proverbDeleteSubmit' : (req , res , next) => {	proverb = req.params.proverb;
		
		Proverb.findOneAndRemove({'url' : new RegExp(proverb , 'i')} , (err) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}
																																													
																																													config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});						});

	} , 

	'proverbVote' : (req , res , next) => {
																									  res.render('proverb/index' , { 'title': 'Vote a Proverb' });
	} , 
}				