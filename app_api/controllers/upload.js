var ethnic = '' , async = require('async') , Upload = require('../models/upload') , config = require('../config/config') , upload = '' , aValue = '' , aParam = '';

module.exports = {

	'uploads' : (req , res , next) => {

		Upload.find({})
										.exec((err , entryResult) => {
																										
																				if (err) {
																																				return config.errResponse(res , 400 , err);		}
																				if (entryResult.length == 0) {
																																				return config.response(res , 404 , {'message' : 'Upload entries does not exists in the record or is not available.'});	}

																																				return config.response(res , 200 , entryResult);		});
	} , 

	'uploadAddSubmit' : (req , res , next) => {	upload = new Upload(req.body);

		upload.save((err , entryResult) => {
																					if (err) {
																															return config.errResponse(res , 400 , err);
																					}	else {
																															return config.response(res , 200 , entryResult);	}		});
	} , 

	'uploadDelete' : (req , res , next) => {	upload = req.params.upload.split('-').join(' ');
		
		if (req.params.upload) {
				
				Upload.findOneAndDelete({'url' : upload})
																									.exec((err , entryResult) => {
																																						
																													if (err) {
																																						return config.errResponse(res , 400 , err);		}
																									if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `Upload entry does not exists in the record or is not available.`});	}

																																						return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});			});			} 	
				else {
								config.response(res , 404 , {'message' : 'No upload id provided. Please provide a valid upload id.'});		}
	} 
	
}				