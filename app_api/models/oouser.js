var mongoose = require('mongoose') , crypto = require('crypto') , jwt = require('jsonwebtoken') , Schema = mongoose.Schema;

const FKHelper = require('./helpers/foreign-key-helper');

const userSchema = new mongoose.Schema({

						'full_name' : {
														'type' : String ,
																							'trim' : true ,
																															'unique' : true ,
																																								'required' : 'Username is required'	} ,
							'email_address' : {
																	'type': String ,
																										'unique' : true ,
																																			'required' : true	} , //value: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
										'created_on' : {
																			'type' : String ,
																												'required': false ,
																																						'default' : Date.now()	} ,
											'hash' : {
																'type' : String ,
																									'required': true	} ,

												'salt' : {
																		'type' : String ,
																											'required': true	} ,

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