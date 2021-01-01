var Specie = require('../models/specie') , config = require('../config/config') , async = require('async') , sValue = '' , specie = '' , sParam = '';

module.exports = {

	'specieName' : (req , res) => {	specie = req.params.specie;
			
			Specie.findOne({'specie' : new RegExp(specie , 'i')})
																														.exec((err , specieResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!specieResult) {
																																								config.response(res , 404 , {'message' : 'Specie entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , specieResult);					});
	} ,

	'specieList' : (req , res) => {	
			
			Specie.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Specie entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'specieDetail' : (req , res) => {		specie = req.params.specie;	

				if (req.params && req.params.specie) {
																			
		Specie.findOne({'specie' : new RegExp(specie , 'i')})
																													.exec((err , specieResult) => {

																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																							if (!specieResult) {
																																			config.response(res , 404 , {'message' : 'Specie entry does not exist in the record or is not available.'});
																																																																																										return false;		}
																																			config.response(res , 200 , specieResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No specie id provided. Please provide a valid specie id.'});		}
	} ,

	'specieAdd' : (req , res) => {	specie = new Specie(req.body);
			
			specie.save((err , specieResult) => {
																							if (err) {
																													config.compiledError(res , 400 , err);
																																																				return false;	}		
																													config.response(res , 200 , specieResult);											});
	} ,

	'specieUpdate' : (req , res) => {	sValue = req.body.specie , specie = req.params.specie;

				if (req.params && req.params.specie) {

				Specie.findOne({'specie' : new RegExp(specie , 'i')} , (err , specie) => {

																																						if (!specie) {	return config.response(res , 404 , {'message' : 'Specie entry does not exist in the record or is not available.'});	}
				Specie.findOneAndUpdate({'specie' : new RegExp(specie , 'i')} , 

									{'$set' : sValue} , {'new' : true , 'runValidators' : true} , (err , specieResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , specieResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No specie id provided. Please provide a valid specie id.'});		}
	} ,

	'specieDelete' : (req , res) => {	specie = req.params.specie;

		if (req.params.specie) {
				
				Specie.findOne({'specie' : new RegExp(specie , 'i')} , (err , specie) => {
																																					
																																						if (!specie) {
																																														return config.response(res , 404 , {'message' : 'Specie entry does not exist in the record or is not available.'});	}
														specie.remove((err , specieResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No specie id provided. Please provide a valid specie id.'});		}
	} 

}