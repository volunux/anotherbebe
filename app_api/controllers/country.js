var Country = require('../models/country') , config = require('../config/config') , async = require('async') , cValue = '' , country = '' , cParam = '';

module.exports = {

	'countryList' : (req , res) => {	

			Country.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'countryName' : (req , res) => {	country = req.params.country;
			
			Country.findOne({'$text' : {'$search' : country }})
																															.lean({})

																															.select('name')

																															.exec((err , countryResult) => {

																														if (err) {
																																								config.errResponse(res , 400 , err);
																																																												return false;	}
																												if (!countryResult) {
																																								config.response(res , 404 , {'message' : 'Country entry does not exists in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , countryResult);					});
	} ,


	'countryDetail' : (req , res) => {		country = req.params.country;	

				if (req.params && req.params.country) {
																			
		Country.findOne({'$text' : {'$search' : country }})
																													.lean({})

																													.exec((err , countryResult) => {

																									if (err) {
																																			config.errResponse(res , 400 , err);
																																																							return false;	}
																							if (!countryResult) {
																																			config.response(res , 404 , {'message' : 'Country entry does not exists in the record or is not available.'});
																																																																																										return false;		}
																																			config.response(res , 200 , countryResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No country id provided. Please provide a valid country id.'});		}
	} ,

	'countryAdd' : (req , res) => {	country = new Country(req.body);
			
			country.save((err , countryResult) => {
																							if (err) {
																													config.errResponse(res , 400 , err);
																																																				return false;	}		
																													config.response(res , 200 , countryResult);											});
	} ,

	'countryUpdate' : (req , res) => {	cValue = req.body.country , country = req.params.country;

				if (req.params && req.params.country) {

				Country.findOne({'$text' : {'$search' : country }} , (err , country) => {

																																						if (!country) {	return config.response(res , 404 , {'message' : 'Country entry does not exists in the record or is not available.'});	}
				Country.findOneAndUpdate({'$text' : {'$search' : country }} , 

									{'$set' : cValue} , {'new' : true , 'runValidators' : true} , (err , countryResult) => {
																																																						if (err) {																																													
																																																												config.errResponse(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , countryResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No country id provided. Please provide a valid country id.'});		}
	} ,

	'countryDelete' : (req , res) => {	country = req.params.country;

		if (req.params.country) {
				
				Country.findOne({'$text' : {'$search' : country }} , (err , country) => {
																																					
																																						if (!country) {
																																														return config.response(res , 404 , {'message' : 'Country entry does not exists in the record or is not available.'});	}
														country.remove((err , countryResult) => {
																																					if (err) {
																																											config.errResponse(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No country id provided. Please provide a valid country id.'});		}
	} 

}