 Baby = require('../models/baby') , config = require('../config/config') , async = require('async') , bValue = '' , baby = '' , bParam = '';

module.exports = {

	'babyName' : (req , res) => {	baby = req.params.baby;
			
			Baby.findOne({'baby' : new RegExp(baby , 'i')})
																												.exec((err , babyResult) => {

																												if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																												if (!babyResult) {
																																						config.response(res , 404 , {'message' : 'Baby entry does not exists in the record or is not available.'});
																																																																																											return false;		}
																																						config.response(res , 200 , babyResult);		});
	} ,

	'babyList' : (req , res) => {	

			Baby.find({})
										.lean({})

										.select('_id')

										.hint({'_id' : 1})

										.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Baby entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'babyDetail' : (req , res) => {		baby = req.params.baby;	

		if (req.params && req.params.baby) {
			
			Baby.findOne({'baby' : new RegExp(baby , 'i')})
																											.exec((err , babyResult) => {

																																	if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																																	if (!babyResult) {
																																											config.response(res , 404 , {'message' : 'Baby entry does not exists in the record or is not available.'});
																																																																																																return false;	}
																																											config.response(res , 200 , babyResult);
																																																																return false;		})		
				}		else {
										config.response(res , 404 , {'message' : 'No baby id provided. Please provide a valid baby id.'});		}
	} ,

	'babyAdd' : (req , res) => {	baby = new Baby(req.body);
			
			baby.save((err , babyResult) => {
																				if (err) {
																										config.compiledError(res , 400 , err);
																																															return false;	}
																										config.response(res , 200 , babyResult);										});
	} ,

	'babyUpdate' : (req , res) => {	bValue = req.body.baby , baby = req.params.baby;

				if (req.params && req.params.baby) {

				Baby.findOne({'baby' : new RegExp(baby , 'i')} , (err , baby) => {	if (!baby) {	return config.response(res , 404 , {'message' : 'Baby entry does not exists in the record or is not available.'});	}

				Baby.findOneAndUpdate({'baby' : new RegExp(baby , 'i')} ,

								{'$set' : bValue} , {'new' : true , 'runValidators' : true} , (err , babyResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , babyResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No baby id provided. Please provide a valid baby id.'});		}
	} ,

	'babyDelete' : (req , res) => {	baby = req.params.baby;

		if (req.params.baby) {
				
				Baby.findOne({'baby' : new RegExp(baby , 'i')} , (err , baby) => {	if (!baby) {	return config.response(res , 404 , {'message' : 'Baby entry does not exists in the record or is not available.'});	}
																	
																		baby.remove((err , babyResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No baby id provided. Please provide a valid baby id.'});		}
		} ,

}