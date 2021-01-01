var Century = require('../models/century') , config = require('../config/config') , async = require('async') , cValue = '' , century = '' , cParam = '';

module.exports = {

	'centuryName' : (req , res) => {	century = req.params.century;
			
			Century.findOne({'century' : new RegExp(century , 'i')})
																															.exec((err , centuryResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																												if (!centuryResult) {
																																								config.response(res , 404 , {'message' : 'Century entry does not exists in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , centuryResult);					});
	} ,

	'centuryList' : (req , res) => {	
			
			Century.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Century entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	} ,

	'centuryDetail' : (req , res) => {		century = req.params.century;	

				if (req.params && req.params.century) {
																			
		Century.findOne({'century' : new RegExp(century , 'i')})
																													.exec((err , centuryResult) => {

																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																							if (!centuryResult) {
																																			config.response(res , 404 , {'message' : 'Century entry does not exists in the record or is not available.'});
																																																																																										return false;		}
																																			config.response(res , 200 , centuryResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No century id provided. Please provide a valid century id.'});		}
	} ,

	'centuryAdd' : (req , res) => {	century = new Century(req.body);
			
			century.save((err , centuryResult) => {
																							if (err) {
																													config.compiledError(res , 400 , err);
																																																				return false;	}		
																													config.response(res , 200 , centuryResult);											});
	} ,

	'centuryUpdate' : (req , res) => {	cValue = req.body.century , century = req.params.century;

				if (req.params && req.params.century) {

				Century.findOne({'century' : new RegExp(century , 'i')} , (err , century) => {

																																						if (!century) {	return config.response(res , 404 , {'message' : 'Century entry does not exists in the record or is not available.'});	}
				Century.findOneAndUpdate({'century' : new RegExp(century , 'i')} , 

									{'$set' : cValue} , {'new' : true , 'runValidators' : true} , (err , centuryResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , centuryResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No century id provided. Please provide a valid century id.'});		}
	} ,

	'centuryDelete' : (req , res) => {	century = req.params.century;

		if (req.params.century) {
				
				Century.findOne({'century' : new RegExp(century , 'i')} , (err , century) => {
																																					
																																						if (!century) {
																																														return config.response(res , 404 , {'message' : 'Century entry does not exists in the record or is not available.'});	}
														century.remove((err , centuryResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No century id provided. Please provide a valid century id.'});		}
	} 

}