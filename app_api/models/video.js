var mongoose = require('mongoose'),		Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

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
																																						'size' : Number 			});

var videoSchema = new Schema({
																	'title' : {
																							'type' : String ,
																																'maxlength' : [120 , 'Title cannot be greater than 120 characters in length.'] ,

																																	'required' : [true , 'Title should be provided and cannot be empty.'] ,

																																		'minlength' : [1 , 'Title cannot be less than 1 character in length.']			} ,
																		'date' : {
																								'type' : String , 
																																	'maxlength' : [15 , 'Date of Video cannot be greater than 15 characters in length.'] ,

																																		'required' : [true , 'Date of Video should be provided and cannot be empty.'] ,

																																			'minlength' : [1 , 'Date of Video cannot be less than 1 character in length.'] } ,

																			'century' : {	
																										'type' : Schema.Types.ObjectId ,	
																																											'ref' : 'Century' ,
																																																					'autopopulate' : true  , 'required' : [true , 'Century ID for Video should be provided.'] ,
																									'validate' : {
																																	'isAsync' : true ,
																																											'validator' : (v) => {
																																																							return FKHelper(mongoose.model('Century') , v );
																																																																																	} ,
																																	'message' : `Century ID reference doesn't exist.`
																												}	} ,

																				'genre' : {	
																										'type' : Schema.Types.ObjectId ,	
																																											'ref' : 'Genre' ,
																																																				'autopopulate' : true  , 'required' : [true , 'Genre ID for Video should be provided.'] ,
																									'validate' : {
																																	'isAsync' : true ,
																																											'validator' : (v) => {
																																																							return FKHelper(mongoose.model('Genre') , v );
																																																																																} ,
																																	'message' : `Genre ID reference doesn't exist.`
																												}	} ,

																					'country' : {	
																													'type' : Schema.Types.ObjectId ,	
																																													'ref' : 'Country' ,
																																																							'autopopulate' : true  , 'required' : [true , 'Country ID for Video should be provided.'] ,
																											'validate' : {
																																			'isAsync' : true ,
																																													'validator' : (v) => {
																																																									return FKHelper(mongoose.model('Country') , v );
																																																																																			} ,
																																			'message' : `Country ID reference doesn't exist.`
																														}	} ,

																						'continent' : {	
																														'type' : Schema.Types.ObjectId ,	
																																															'ref' : 'Continent' ,
																																																										'autopopulate' : true  , 'required' : [true , 'Continent ID for Video should be provided.'] ,
																													'validate' : {
																																					'isAsync' : true ,
																																															'validator' : (v) => {
																																																											return FKHelper(mongoose.model('Continent') , v );
																																																																																					} ,
																																					'message' : `Continent ID reference doesn't exist`
																																}	} ,
																							'region' : {	
																														'type' : Schema.Types.ObjectId ,	
																																															'ref' : 'Region' ,
																																																									'autopopulate' : true  , 'required' : [true , 'Region ID for Video should be provided.'] ,
																													'validate' : {
																																					'isAsync' : true ,
																																															'validator' : (v) => {
																																																											return FKHelper(mongoose.model('Region') , v );
																																																																																				} ,
																																					'message' : `Region ID reference doesn't exist.`
																																}	} ,

																							'ethnic_group' : {	
																																	'type' : Schema.Types.ObjectId ,	
																																																		'ref' : 'Eyon' ,
																																																											'autopopulate' : true  , 'required' : [true , 'Eyon ID for Video should be provided.'] ,
																																'validate' : {
																																								'isAsync' : true ,
																																																		'validator' : (v) => {
																																																														return FKHelper(mongoose.model('Eyon') , v );
																																																																																						} ,
																																								'message' : `Eyon ID reference doesn't exist.`
																																			}	} ,
				
																									'about' : {
																															'type' : String ,
																																								'maxlength' : [2000 , 'About video cannot be greater than 2000 characters in length.'] ,

																																							 		'required' : [true , 'About video cannot be empty and should be provided.'] ,
																																															
																														 										 		'minlength' : [10 , 'About video cannot be less than 10 characters in length.']			} ,

																											'author' : {
																																		'type' : Schema.Types.ObjectId ,
																																																			'ref' : 'User' ,
																																																												'autopopulate' : true , 'required' : [true , 'User ID for Video should be provided.'] ,
																													'validate' : {
																																					'isAsync' : true ,
																																															'validator' : (v) => {
																																																											return FKHelper(mongoose.model('User') , v );
																																																																																				} ,
																																					'message' : `User ID reference doesn't exist.`
																																}	} ,

																								'language' : {
																																'type' : String ,
																																									'maxlength' : [25 , 'Language cannot be greater than 25 characters in length.'] ,
																																										
																																										'required' : [true , 'Language cannot be empty and should be provided.'] ,
																														 										 			
																														 										 			'minlength' : [1 , 'Language cannot be less than 1 character in length.']			} ,
																								'publisher' : {
																																'type' : String ,
																																									'maxlength' : [25 , 'Publisher cannot be greater than 25 characters in length.'] ,
																																										
																																										'required' : [true , 'Publisher cannot be empty and should be provided.'] ,
																															 										 		
																															 										 		'minlength' : [1 , 'Publisher cannot be less than 1 character in length.']			} ,

																									'length' : {
																																'type' : Number ,
																																									'maxlength' : [25 , 'Length cannot be greater than 25 characters in length.'] 	} ,

																										'credit' : {
																																	'type' : String ,
																																										'maxlength' : [25 , 'Credit cannot be greater than 25 characters in length.'] 	} ,

																										'video_detail' : fileSchema ,


																											'vote' : {
																																	'type' : 'Number' ,
																																											'default' : 0		} ,

																												'date_created' : {
																																						'type' : Date ,
																																														'default' : Date.now 	} ,

																													'url' : {
																																		'type' : String ,
																																											'slug' : 'title' ,
																																																					'unique' : true ,
																																																														'slugPaddingSize' : 1 ,
																																																																										'permanent' : true		}
} ,	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

videoSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug);

module.exports = mongoose.model('Video' , videoSchema);