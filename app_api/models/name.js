var mongoose = require('mongoose') ,	Schema = mongoose.Schema;

const FKHelper = require('./helpers/foreign-key-helper');

const fileSchema = new Schema({
																'filename' : {	
																								'type' : String	} ,

																									'path' : String ,	
																																						'mimetype' : String , 
																										'encoding' :  String ,
																																						'Location' : String ,
																											'Key' : String ,	
																																						'location' : String ,
																											'key' : String ,	
																																						'size' : Number 			} , {'_id' : false});

var nameSchema = new Schema({

															'name' : {
																					'type' : String ,
																														'maxlength' : [36	, 'Name cannot be greater than 36 characters in length.'] ,
																															
																															'required' : [true , 'Name should be provided and cannot be empty.'] ,

																																'set' : turnCapitalize } ,
																'definition' : {
																									'type' : String ,
																																		'maxlength' : [300 , 'Definition cannot be greater than 300 characters in length.'] ,
																																																																
																																			'required' : [true , 'Definition should be provided and cannot be empty.'] ,

																																				'set' : capitalize } ,
																	'morphology' : {
																										'type' : String ,
																																				'maxlength' : [200 , 'Morphology cannot be greater than 200 characters in length.']	,

																																					'required' : [true , 'Morphology should be provided and cannot be empty.'] ,

																																						'set' : capitalize 	} ,
																		'gloss' : {
																								'type' : String ,
																																		'maxlength' : [200 , 'Gloss cannot be greater than 200 characters in length.']	,

																																			'required' : [true , 'Gloss should be provided and cannot be empty.'] ,

																																				'set' : capitalize } ,

																				'alphabet' : {	
																												'type' : String ,
																																					'ref' : 'Alphabet' ,
																																																'autopopulate' : true , 

																																					'required' : [true , 'Alphabet ID should be provided and cannot be empty.'] ,
																							'validate' : {
																															'validator' : (v) => {
																																											return FKHelper.primaryKey(mongoose.model('Alphabet') , v );	} ,
																									
																										'message' : `Alphabet ID reference doesn't exists in the record or is not available.`		}	} ,

																				'continent' : {
																												'type' : String ,
																																					'ref' : 'Continent' ,
																																																'autopopulate' : true , 

																																					'required' : [true , 'Continent ID should be provided and cannot be empty.'] ,
																						'validate' : {
																														'validator' : (v) => {
																																										return FKHelper.primaryKey(mongoose.model('Continent') , v );	} ,

																											'message' : `Continent ID reference doesn't exists in the record or is not available.`		}	} ,

																					'region' : {
																												'type' : String ,
																																					'ref' : 'Region' ,
																																																'autopopulate' : true , 

																																					'required' : [true , 'Region ID should be provided and cannot be empty.'] ,
																									'validate' : {
																																	'validator' : (v) => {
																																													return FKHelper.primaryKey(mongoose.model('Region') , v );		} ,

																												'message' : `Region ID reference doesn't exists in the record or is not available.`		}	} ,

																					'ethnic_group' : {
																															'type' : String ,
																																								'ref' : 'Eyon' ,
																																																	'autopopulate' : true  , 

																																								'required' : [true , 'Ethnic Group ID should be provided and cannot be empty.'] ,
																									'validate' : {
																																	'validator' : (v) => {
																																													return FKHelper.primaryKey(mongoose.model('Eyon') , v );	} ,

																																	'message' : `Ethnic Group ID reference doesn't exists in the record or is not available.`	}	} ,
																						'gender' : {
																													'type' : String ,	
																																						'ref' : 'Gender' ,
																																																'autopopulate' : true  , 

																																			'required' : [true , 'Gender ID should be provided and cannot be empty.'] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('Gender') , v );		} ,

																																'message' : `Gender ID reference doesn't exists in the record or is not available.`		}	} ,

																							'baby' : {	
																													'type' : String ,	
																																						'ref' : 'Baby' ,
																																															'autopopulate' : true  , 

																																						'required' : [true , 'Baby ID should be provided and cannot be empty.'] ,
																									'validate' : {
																																	'validator' : (v) => {
																																													return FKHelper.primaryKey(mongoose.model('Baby') , v );		} ,

																																	'message' : `Baby ID reference doesn't exists in the record or is not available.`		}	} ,

																								'specie' : {
																															'type' : String ,	
																																								'ref' : 'Specie' ,
																																																		'autopopulate' : true  , 

																																								'required' : [true , 'Specie ID should be provided and cannot be empty.'] ,
																											'validate' : {
																																			'validator' : (v) => {
																																															return FKHelper.primaryKey(mongoose.model('Specie') , v );		} ,

																																			'message' : `Specie ID reference doesn't exists in the record or is not available.`		}	} ,

																									'author' : {
																																'type' : String ,
																																									'ref' : 'User' ,
																																																		'autopopulate' : true , 

																																									'required' : [true , 'User ID should be provided and cannot be empty.'] ,
																											'validate' : {
																																			'validator' : (v) => {
																																															return FKHelper.primaryKey(mongoose.model('User') , v );		} ,

																																			'message' : `User ID reference doesn't exists in the record or is not available.`		}	} ,

																									'views' : {
																															'type' : Number ,
																																								'default' : 0		} ,
																									'status' : {
																																'type' : String ,
																																									'enum' : {
																																															'values' : ['approved' , 'disapproved' , 'review' , 'pending'] ,

																																															'message' : 'Status is required.'} ,

																																															'default' : 'approved'		} ,
																									'photo' : [fileSchema] ,

																									'draft' : {
																																'type' : Boolean ,
																																										'default' : false		} ,
 																									'hidden' : {
																																'type' : Boolean ,
																																										'default' : false		} ,
} ,	{
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

								'id' : false , 

								'selectedPopulatedPaths' : false ,

								'timestamps' : {

										'createdAt' : 'createdAt' ,

										'updatedAt' : 'updatedAt'
								} ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 2
									}
});


function capitalize(field) {

		return field ? `${field.charAt(0).toUpperCase()}${field.slice(1)}` : '';
};

function turnCapitalize(val) {

	if (typeof val !== 'string') {

			val = ''; }
	
		return val 	.split(' ')

								.map((n) => {		return n.charAt(0).toUpperCase() + n.substring(1).toLowerCase();		}).join(' ');
};

var uniqueAndCast = function(err , doc , next) {

		if (err.name == 'CastError') {

			var validationError = new mongoose.Error.ValidationError(null);
				
				validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : 'Please provide a valid id or value and try again.' })); 
		
						return next(validationError);		}

		else if (err.code === 11000 && err.name === 'MongoError') {
													
						return next(new Error('All fields parameters must be unique and try again.'));		 }
						
		else if (err.code == 2) {
		
				var validationError = new mongoose.Error.ValidationError(null);
					
					validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : 'An error has occured. Please try again.' })); 
			
							return next(validationError);
		}
			else {
							return next(err)
		}
};

mongoose.Schema.Types.Boolean.cast(v => {
	
	if (v === '' || v === false) {
		
			return false;
	}
			return v;
});

nameSchema.index({'ethnic_group' : 1 , 'specie' : 1 , 'alphabet' : 1});

nameSchema.index({'name' : 1 , 'ethnic_group' : 1 , 'specie' : 1});

nameSchema.index({'specie' : 1});

mongoose.set('runValidators' , true)

module.exports = mongoose.model('Name' , nameSchema);
