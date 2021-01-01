var Gender = require('../models/gender') , config = require('../config/db') , async = require('async') , gValue = '' , gender = '' , gParam = '';

module.exports = {

	'genderName' : (req , res) => {	gender = req.params.gender;
			
			Gender.findOne({'gender' : new RegExp(gender , 'i')})
																														.exec((err , genderResult) => {

																																if (err) {
																																										config.response(res , 400 , err);
																																																											return false;	}
																															if (!genderResult) {
																																										config.response(res , 404 , {'message' : 'Gender entry does not exist in the record or is not available.'});
																																																																																																	return false;		}
																																										config.response(res , 200 , genderResult);		});
	} ,

	'genderList' : (req , res) => {	

			Gender.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Gender entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'genderDetail' : (req , res) => {		gender = req.params.gender;	

				if (req.params && req.params.gender) {
																			
		Gender.findOne({'gender' : new RegExp(gender , 'i')})
																															.exec((err , genderResult) => {

																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																							if (!genderResult) {
																																			config.response(res , 404 , {'message' : 'Gender entry does not exist in the record or is not available.'});
																																																																																										return false;		}
																																			config.response(res , 200 , genderResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No gender id provided. Please provide a valid gender id.'});		}
	} ,

	'genderAdd' : (req , res) => { gender = new Gender(req.body);
			
			gender.save((err , genderResult) => {
																						if (err) {
																												config.response(res , 400 , err);
																																																		return false;	}																												
																												config.response(res , 200 , genderResult);										});
	} ,

	'genderUpdate' : (req , res) => {	gValue = req.body.gender , gender = req.params.gender;

				if (req.params && req.params.gender) {

				Gender.findOne({'gender' : new RegExp(gender , 'i')} , (err , gender) => {
					
																																							if (!gender) {	return config.response(res , 404 , {'message' : 'Gender entry does not exist in the record or is not available.'});	}
				Gender.findOneAndUpdate({'gender' : new RegExp(gender , 'i')} , 

							{'$set' : gValue} , {'new' : true , 'runValidators' : true} , (err , genderResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																																return false;	}
																																																										config.response(res , 201 , genderResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No gender id provided. Please provide a valid gender id.'});		}
	} ,

	'genderDelete' : (req , res) => {	gender = req.params.gender;

		if (req.params.gender) {
				
			Gender.findOne({'gender' : new RegExp(gender , 'i')} , (err , gender) => {

																																							if (!gender) {
																																															return config.response(res , 404 , {'message' : 'Gender entry does not exist in the record or is not available.'});	}
																		gender.remove((err , genderResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No gender id provided. Please provide a valid gender id.'});		}
	}

}