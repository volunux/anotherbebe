var Language = require('../models/language') , config = require('../config/config') , async = require('async') , lValue = '' , language = '' , lParam = '';

module.exports = {

	'languageName' : (req , res) => {	language = req.params.language;
			
			Language.findOne({'name' : new RegExp(language , 'i')})
																															.exec((err , languageResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!languageResult) {
																																								config.response(res , 404 , {'message' : 'Language entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , languageResult);					});
	} ,

	'languageList' : (req , res) => {	
			
			Language.find({})
											.exec((err , languageResult) => {
																													if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																						if (languageResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'Language entries does not exist in the record or is not available.'});
																																																																																																return false;		}
																																								config.response(res , 200 , languageResult);				});
	},

	'languageDetail' : (req , res) => {		language = req.params.language;	

				if (req.params && req.params.language) {
																			
		Language.findOne({'name' : new RegExp(language , 'i')})
																													.exec((err , languageResult) => {

																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																							if (!languageResult) {
																																			config.response(res , 404 , {'message' : 'Language entry does not exist in the record or is not available.'});
																																																																																										return false;		}
																																			config.response(res , 200 , languageResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No language id provided. Please provide a valid language id.'});		}
	} ,

	'languageAdd' : (req , res) => {	language = new Language(req.body);
			
			language.save((err , languageResult) => {
																							if (err) {
																													config.compiledError(res , 400 , err);
																																																				return false;	}		
																													config.response(res , 200 , languageResult);											});
	} ,

	'languageUpdate' : (req , res) => {	lValue = req.body.language , language = req.params.language;

				if (req.params && req.params.language) {

				Language.findOne({'name' : new RegExp(language , 'i')} , (err , language) => {

																																						if (!language) {	return config.response(res , 404 , {'message' : 'Language entry does not exist in the record or is not available.'});	}
				Language.findOneAndUpdate({'name' : new RegExp(language , 'i')} , 

									{'$set' : lValue} , {'new' : true , 'runValidators' : true} , (err , languageResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , languageResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No language id provided. Please provide a valid language id.'});		}
	} ,

	'languageDelete' : (req , res) => {	language = req.params.language;

		if (req.params.language) {
				
				Language.findOne({'name' : new RegExp(language , 'i')} , (err , language) => {
																																					
																																						if (!language) {
																																														return config.response(res , 404 , {'message' : 'Language entry does not exist in the record or is not available.'});	}
														language.remove((err , languageResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No language id provided. Please provide a valid language id.'});		}
	} 

}