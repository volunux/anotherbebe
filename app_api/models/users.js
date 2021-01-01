var mongoose = require('mongoose') , crypto = require('crypto') , jwt = require('jsonwebtoken') , Schema = mongoose.Schema;

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
const userSchema = new mongoose.Schema({

					'full_name' : {
													'type' : String ,
																						'required': [true , 'Full Name cannot be empty and should be provided.'] ,

																								'maxlength' : [20 , 'Full Name cannot be greater than 40 characters in length.']	,

																										'minlength' : [1 , 'Full Name cannot be less than 1 character in length.'] 	} ,
						'username' : {
														'type' : String ,
																							'trim' : true ,

																								'lowercase' : true ,
		
																										'unique' : true ,

																											'maxlength' : [15 , 'Username cannot be greater than 15 characters in length.'] ,

																												'minlength' : [1 , 'Username cannot be less than 1 character in length.'] ,
																																																												
																													'required' : [true , 'Username cannot be empty and should be provided.']	} ,
							'email_address' : {
																	'type': String ,
																										'unique' : [true , 'Email address should be unique.'] ,
																													
																											'required' : [true , 'Email address cannot be empty and should be provided.']	} ,
								'role' : {
														'type': String ,
																							'unique' : false ,
																																	'required' : [true , 'A role cannot be empty and should be provided.'] ,

																																			'enum' : ['user' , 'moderator' , 'admin' , 'superAdmin'] ,
																																												
																																					'default' : 'user' } ,
									'about' : {
															'type' : String ,
																								'required' : false ,
																																		'maxlength' : [300 , 'About user cannot be greater than 400 characters in length.']	} ,

									'status' : {
																'type' : String ,
																									'required' : false ,	
																																				'default' : 'active' ,
																																																'enum' : ['active' , 'banned' , 'inactive' , 'pending']	} ,
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
																									'required': true ,
																																			'select' : false } ,
												'salt' : {
																		'type' : String ,
																											'required': true ,
																																					'select' : false		} ,
														'country' : {
																					'type' : Schema.Types.ObjectId ,
																																						'ref' : 'Country' ,
																																																'autopopulate' : true , 'required' : [true , 'Country ID for User should be provided.'] ,
																					'validate' : {
																													'isAsync' : true ,
																																							'validator' : (v) => {
																																																			return FKHelper.primaryKey(mongoose.model('Country') , v );
																																																																																	} ,
																													'message' : `Country ID reference doesn't exist.`
																								}	} ,

																'ethnic_group' : {
																										'type' : Schema.Types.ObjectId ,
																																											'ref' : 'Eyon' ,
																																																				'autopopulate' : true , 'required' : [true , 'Ethnic Group ID for User should be provided.'] ,
																					'validate' : {
																													'isAsync' : true ,
																																							'validator' : (v) => {
																																																			return FKHelper.primaryKey(mongoose.model('Eyon') , v );
																																																																																} ,
																													'message' : `Ethnic Group ID reference doesn't exist.`
																								}	} ,

																			'profile_photo' : fileSchema
} , {
			'toObject' : {
										'virtuals' : true
		} ,
				'toJSON' : {
											'virtuals' : true
				} ,
						'getters' : true ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 1
									}
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

/*userSchema.pre('save' , function(next) {

  
  if (this.isModified('password')) {
		
		this.salt = crypto.randomBytes(16).toString('hex');
  
    return crypto.pbkdf2Sync(this.password , this.salt , 1000 , 64 , 'sha512' , (err, hash) => {
  
      if (err) {
  
        return next(err);
  
      }
  
      this.password = hash;
  
      next();
    });
  }
  next();
});*/

userSchema.methods.generateJwt = function () {
	
	const expiry = new Date();
															expiry.setDate(expiry.getDate() + 7);
																																		return jwt.sign({
																																											'_id' : this._id ,
																																										
																																												'email_address' : this.email_address ,
																																													
																																													'username' : this.username ,
																																														
																																														'exp' : parseInt(expiry.getTime() / 1000, 10) /*parseInt(Date.now() / 1000) + 1 * 60* 1 denote minute*/ ,
																																																																							} , process.env.JWT_SECRET );
																			};

userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', userSchema);