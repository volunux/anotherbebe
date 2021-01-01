var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , config = require('../config/config') ,

art = '' , aValue = '' , aParam = '' , eyonId = '' , countryId = '' , country = '' , Food = require('../models/food') , Life = require('../models/life') , Dress = require('../models/dress') , 

Festival = require('../models/festival') , Folktale = require('../models/folktale') , Religion = require('../models/religion') , Legend = require('../models/legend');

var Art = require('../../app_api/models/models').Art;

module.exports = {

	'all' : (req , res , next) => {

		async.parallel({
																									'Art' : (callback) => {
																																											Art.find({}).exec(callback);
																									} ,

																									'Food' : (callback) => {
																																											Food.find({}).exec(callback);
																									} ,

																									'Life' : (callback) => {
																																											Life.find({}).exec(callback);
																									} ,

																									'Festival' : (callback) => {
																																											Festival.find({}).exec(callback);
																									} ,

																									'Folktale' : (callback) => {
																																											Folktale.find({}).exec(callback);
																									} ,
			} , (err , result) => {	
															if (err) {
																								config.compiledError(res , 400 , err);
																																												return false;		}
															if (!result) {
																								config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																												return false;		}
																								config.response(res , 200 , result);					});
	} , 	

	'verify' : (req , res , next) => {

			console.log('It works');

			next();

	} ,

	'addApi' : (req , res , next) => {
																					config.response(res , 200 , {'message' : 'Welcome to the Add Api Route'})
	} ,

	'updateApi' : (req , res , next) => {
																					config.response(res , 200 , {'message' : 'Welcome to the Update Api Route'})
	} ,

	'deleteApi' : (req , res , next) => {
																					config.response(res , 200 , {'message' : 'Welcome to the Delete Api Route'})
	}


}				