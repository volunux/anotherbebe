var mongoose = require('mongoose') , crypto = require('crypto') , jwt = require('jsonwebtoken') , Schema = mongoose.Schema;

const FKHelper = require('./helpers/foreign-key-helper');

const fileSchema = new Schema({
																'filename' : {	'type' : String	} ,
																																		'path' : String ,
																																											'mimetype' : String , 
																																																						'encoding' :  String ,
																																																																		'size' : Number 			});
const userSchema = new mongoose.Schema({

					'full_name' : {
													'type' : String ,
																						'required': [true , 'Your username is required and should be provided.'] ,

																								'maxlength' : [20 , 'Full Name cannot exceed 40 characters in length.']	

																										'minlength' : [1 , 'Full Name cannot be less than 1 character in length.'] 	} ,
						'username' : {
														'type' : String ,
																							'trim' : true ,

																								'lowercase' : true ,
		
																										'unique' : [true , 'Email address must be unique'] ,
																																																												
																											'required' : [true , 'Username is required and should be provided']	} ,
							'email_address' : {
																	'type': String ,
																										'unique' : true ,
																																			'required' : [true , 'Email address is required and should be provided.']	} ,
								'role' : {
														'type': String ,
																							'unique' : false ,
																																	'required' : [true , 'A role is required and should be provided'] ,

																																			'enum' : ['user' , 'moderator' , 'admin' , 'superAdmin'] ,
																																												
																																					'default' : 'user' } ,
									'about' : {
															'type' : String ,
																								'required' : false ,
																																		'maxlength' : [300 , 'About user cannot exceed 400 characters in length.']	} ,
										'created_on' : {
																			'type' : String ,
																												'required': false ,
																																						'default' : Date.now()	} ,
										'last_loggedIn' : {
																				'type' : String ,
																													'required': false ,
																																							'default' : Date.now()	} ,
											'hash' : {
																'type' : String ,
																									'required': true	} ,

												'salt' : {
																		'type' : String ,
																											'required': true	} ,

														'country' : {
																					'type' : Schema.Types.ObjectId ,
																																						'ref' : 'Country' ,
																																																'autopopulate' : true , 'required' : [true , 'Country ID for art must be provided.'] ,
																					'validate' : {
																													'isAsync' : true ,
																																							'validator' : (v) => {
																																																			return FKHelper(mongoose.model('Country') , v );
																																																																												} ,
																													'message' : `Country ID reference doesn't exist.`
																								}	} ,

																'ethnic_group' : {
																										'type' : Schema.Types.ObjectId ,
																																											'ref' : 'Eyon' ,
																																																				'autopopulate' : true , 'required' : [true , 'Ethnic Group ID for art must be provided.'] ,
																					'validate' : {
																													'isAsync' : true ,
																																							'validator' : (v) => {
																																																			return FKHelper(mongoose.model('Eyon') , v );
																																																																												} ,
																													'message' : `Ethnic Group ID reference doesn't exist.`
																								}	} 

																			'profile_photo' : [fileSchema],
});


userSchema.methods.setPassword = function (password) {
	
	this.salt = crypto.randomBytes(16).toString('hex');
	
	this.hash = crypto
										.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
																																				.toString('hex');

};

userSchema.methods.displayName = function (password) {
	
		return this.name || this.username;

};

userSchema.methods.validPassword = function (password) {
	
	const hash = crypto
											.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
																																					.toString('hex');

														return this.hash === hash;
};


userSchema.methods.generateJwt = function () {
	
	const expiry = new Date();
															expiry.setDate(expiry.getDate() + 7);
																																		return jwt.sign({
																																											'_id' : this._id ,
																																																					'email' : this.email ,
																																																																	'name' : this.name ,
																																																																												'exp' : parseInt(expiry.getTime() / 1000, 10) ,
																																												} , process.env.JWT_SECRET );
																			};

module.exports = mongoose.model('User', userSchema);