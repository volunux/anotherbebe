var Continent = require('../models/continent') , config = require('../config/config') , async = require('async') , cValue = '' , continent = '' , cParam = '';

module.exports = {

	'continentName' : (req , res) => {	continent = req.params.continent;
			
		Continent.findOne({'name' : new RegExp(continent , 'i')})
																															.exec((err , continentResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!continentResult) {
																																								config.response(res , 404 , {'message' : 'Continent entry does not exist in the record or is not available.'});
																																																																																																return false;		}
																																								config.response(res , 200 , continentResult);					});
	} ,

	'continentList' : (req , res) => {	
			
			Continent.find({})
												.lean({})

												.select('_id')

												.hint({'_id' : 1})

												.exec((err , entryResult) => {
																						
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Continent entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'continentDetail' : (req , res) => {		continent = req.params.continent;	

				if (req.params && req.params.continent) {
																			
		Continent.findOne({'name' : new RegExp(continent , 'i')})
																															.exec((err , continentResult) => {

																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																							if (!continentResult) {
																																			config.response(res , 404 , {'message' : 'Continent entry does not exist in the record or is not available.'});
																																																																																											return false;		}
																																			config.response(res , 200 , continentResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No continent id provided. Please provide a valid continent id.'});		}
	} ,

	'continentAdd' : (req , res) => {	continent = new Continent(req.body);
			
			continent.save((err , continentResult) => {
																									if (err) {
																															config.compiledError(res , 400 , err);
																																																						return false;	}		
																															config.response(res , 200 , continentResult);											});
	} ,

	'continentUpdate' : (req , res) => {	cValue = req.body.continent , continent = req.params.continent;

				if (req.params && req.params.continent) {

				Continent.findOne({'name' : new RegExp(continent , 'i')} , (err , continent) => {

																																				if (!continent) {	return config.response(res , 404 , {'message' : 'Continent entry does not exist in the record or is not available.'});	}
				
				Continent.findOneAndUpdate({'name' : new RegExp(continent , 'i')} , 

									{'$set' : cValue} , {'new' : true , 'runValidators' : true} , (err , continentResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , continentResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No continent id provided. Please provide a valid continent id.'});		}
	} ,

	'continentDelete' : (req , res) => {	continent = req.params.continent;

		if (req.params.continent) {
				
				Continent.findOne({'name' : new RegExp(continent , 'i')} , (err , continent) => {
																																					
																																				if (!continent) {
																																													return config.response(res , 404 , {'message' : 'Continent entry does not exist in the record or is not available.'});	}
														continent.remove((err , continentResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No continent id provided. Please provide a valid continent id.'});		}
	} 

}