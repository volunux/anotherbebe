var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

const FKHelper = require('./helpers/foreign-key-helper');

var proverbSchema = new Schema({
																	'proverb' : {
																								'type' : String ,
																																	'maxlength' : [120 , 'Title cannot be greater than 120 characters in length.'] ,
																																	
																																		'required' : [true , 'Title cannot be empty and should be provided.'] ,

																																			'minlength' : [1 , 'Title cannot be less than 1 character in length.']			} ,
																			'literal' : {
																											'type' : String ,
																																				'maxlength' : [150 , 'Literal cannot be greater than 150 characters in length.'] ,
																																				
																																					'required' : [true , 'Literal cannot be empty and should be provided.'] ,
																																				
																																						'minlength' : [1 , 'Literal cannot be less than 1 character in length.']			} ,
																				'meaning' : {
																												'type' : String ,
																																					'maxlength' : [150 , 'Meaning cannot be greater than 150 characters in length.'] ,
																																					
																																						'required' : [true , 'Meaning cannot be empty and should be provided.'] ,
																																					
																																							'minlength' : [1 , 'Meaning cannot be less than 1 character in length.']			} ,
																					'ethnic_group' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'Eyon' ,
																																																									'autopopulate' : true , 'required' : [true , 'Ethnic ID for Proverb should be provided.'] ,
																												'validate' : {
																																				'isAsync' : true ,
																																														'validator' : (v) => {
																																																										return FKHelper(mongoose.model('Eyon') , v );
																																																																																			} ,
																																				'message' : `Ethnic Group ID reference doesn't exist.`
																															}	} ,

																								'author' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'User' ,
																																																									'autopopulate' : true , 'required' : [true , 'User ID for Proverb should be provided.'] ,
																										'validate' : {
																																		'isAsync' : true ,
																																												'validator' : (v) => {
																																																								return FKHelper(mongoose.model('User') , v );
																																																																																	} ,
																																		'message' : `User ID reference doesn't exist.`
																													}	} ,

																										'title' : {
																																'type' : String 
																										} ,
																											
																											'url' : {
																																'type' : String ,
																																									'slug' : 'title' ,
																																																			'unique' : false ,
																																																												'slugPaddingSize' : 3		}
} ,	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

proverbSchema.path('title').set( (v) => {
 																					return `${proverbSchema.get('ethnic_group.eyon')} Proverb `;
});

proverbSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Proverb' , proverbSchema);