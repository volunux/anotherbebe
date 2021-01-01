var Region = require('../models/region') , config = require('../config/config') , async = require('async') , rValue = '' , region = '' , rParam = '';

module.exports = {

	'regionName' : (req , res) => {	region = req.params.region;
			
			Region.findOne({'name' : new RegExp(region , 'i')})
																													.exec((err , regionResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!regionResult) {
																																								config.response(res , 404 , {'message' : 'Region entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , regionResult);					});
	} ,

	'regionList' : (req , res) => {	
			
			Region.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Region entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'regionDetail' : (req , res) => {		region = req.params.region;	

				if (req.params && req.params.region) {
																			
		Region.findOne({'name' : new RegExp(region , 'i')})
																													.exec((err , regionResult) => {

																									if (err) {
																																		config.compiledError(res , 400 , err);
																																																						return false;	}
																							if (!regionResult) {
																																		config.response(res , 404 , {'message' : 'Region entry does not exist in the record or is not available.'});
																																																																																									return false;		}
																																		config.response(res , 200 , regionResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No region id provided. Please provide a valid region id.'});		}
	} ,

	'regionAdd' : (req , res) => {	region = new Region(req.body);
			
			region.save((err , regionResult) => {
																							if (err) {
																													config.compiledError(res , 400 , err);
																																																			return false;	}		
																													config.response(res , 200 , regionResult);										});
	} ,

	'regionUpdate' : (req , res) => {	rValue = req.body.region , region = req.params.region;

				if (req.params && req.params.region) {

				Region.findOne({'name' : new RegExp(region , 'i')} , (err , region) => {

																																						if (!region) {	return config.response(res , 404 , {'message' : 'Region entry does not exist in the record or is not available.'});	}
				Region.findOneAndUpdate({'name' : new RegExp(region , 'i')} , 

									{'$set' : rValue} , {'new' : true , 'runValidators' : true} , (err , regionResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , regionResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No region id provided. Please provide a valid region id.'});		}
	} ,

	'regionDelete' : (req , res) => {	region = req.params.region;

		if (req.params.region) {
				
				Region.findOne({'name' : new RegExp(region , 'i')} , (err , region) => {
																																					
																																						if (!region) {
																																														return config.response(res , 404 , {'message' : 'Region entry does not exist in the record or is not available.'});	}
														region.remove((err , regionResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No region id provided. Please provide a valid region id.'});		}
	} 

}