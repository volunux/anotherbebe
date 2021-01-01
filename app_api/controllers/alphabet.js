var Alphabet = require('../models/alphabet') , config = require('../config/db') , async = require('async') , aValue = '' , alphabet = '' , aParam = '';

module.exports = {

	'alphabetName' : (req , res) => {	alphabet = req.params.alphabet;
			
			Alphabet.findOne({'alphabet' : new RegExp(alphabet , 'i')})
																																	.exec((err , alphabetResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!alphabetResult) {
																																								config.response(res , 404 , {'message' : 'Alphabet entry does not exists in the record or is not available.'});
																																																																																																return false;	}
																																								config.response(res , 200 , alphabetResult);	});
	} ,

	'alphabetList' : (req , res) => {	

			Alphabet.find({})
												.lean({})

												.select('_id')

												.hint({'_id' : 1})

												.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Alphabet entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} , 

	'alphabetDetail' : (req , res) => {		alphabet = req.params.alphabet;	

		if (req.params && req.params.alphabet) {
			
			Alphabet.findOne({'alphabet' : new RegExp(alphabet , 'i')})
																																	.exec((err , alphabetResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!alphabetResult) {
																																								config.response(res , 404 , {'message' : 'Alphabet entry does not exists in the record or is not available.'});
																																																																																															return false;	}
																																								config.response(res , 200 , alphabetResult);
																																																															return false;		})		
				}		else {
										config.response(res , 404 , {'message' : 'No alphabet id provided. Please provide a valid alphabet id.'});		}
	} ,

	'alphabetAdd' : (req , res) => {	alphabet = new Alphabet(req.body);
			
			alphabet.save((err , alphabetResult) => {
																								if (err) {
																														config.compiledError(res , 400 , err);
																																																					return false;	}
																														config.response(res , 200 , alphabetResult);									});
	} ,

	'alphabetUpdate' : (req , res) => {	aValue = req.body.alphabet , alphabet = req.params.alphabet;

				if (req.params && req.params.alphabet) {

				Alphabet.findOne({'alphabet' : new RegExp(alphabet , 'i')} , (err , alphabet) => {
																																						

																																					if (!alphabet) {	return config.response(res , 404 , {'message' : 'Alphabet entry does not exists in the record or is not available.'});	}

				Alphabet.findOneAndUpdate({'alphabet' : new RegExp(alphabet , 'i')} ,

								{'$set' : aValue} , {'new' : true , 'runValidators' : true} , (err , alphabetResult) => {
																																																					if (err) {																																													
																																																											config.compiledError(res , 400 , err);
																																																																																		return false;	}
																																																											config.response(res , 201 , alphabetResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No alphabet id provided. Please provide a valid alphabet id.'});		}
	} , 

	'alphabetDelete' : (req , res) => {	alphabet = req.params.alphabet;

		if (req.params.alphabet) {
				
				Alphabet.findOne({'alphabet' : new RegExp(alphabet , 'i')} , (err , alphabet) => {
																		
																																					if (!alphabet) {	return config.response(res , 404 , {'message' : 'Alphabet entry does not exists in the record or is not available.'});	}
													alphabet.remove((err , alphabetResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No alphabet id provided. Please provide a valid alphabet id.'});		} } ,

}