var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

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

var lawSchema = new Schema({
																	'title' : {
																							'type' : String ,
																																'maxlength' : [120 , 'Title cannot be greater than 120 characters in length.'] ,
																																
																																'required' : [true , 'Title cannot be empty and should be provided.'] ,
																																
																																'minlength' : [1 , 'Title cannot be less than 1 character in length.']			} ,

																		'ethnic_group' : {
																												'type' : Schema.Types.ObjectId ,
																																													'ref' : 'Eyon' ,
																																																						'autopopulate' : true , 'required' : [true , 'Ethnic ID for Law should be provided.'] ,
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
																																																					'autopopulate' : true , 'required' : [true , 'User ID for Law should be provided.'] ,
																						'validate' : {
																														'isAsync' : true ,
																																								'validator' : (v) => {
																																																				return FKHelper(mongoose.model('User') , v );
																																																																													} ,
																														'message' : `User ID reference doesn't exist.`
																									}	} ,

																						'main_body' : {
																														'type' : String ,
																																							'maxlength' : [6000 , 'Law body cannot be greater than 6000 characters in length.'] ,
																																							
																																							'required' : [true , 'Law body cannot be empty and should be provided.'] ,
																																							
																																							'minlength' : [10 , 'Law body cannot be less than 10 characters in length.']			} ,
																								'url' : {
																														'type' : String ,
																																							'slug' : 'title' ,
																																																	'unique' : true ,
																																																										'slugPaddingSize' : 1	,
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

lawSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug);

module.exports = mongoose.model('Law' , lawSchema);