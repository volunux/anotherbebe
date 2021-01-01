module.exports = function(model , modelName , parent , reply ) {

var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater') , uniqueValidator = require('mongoose-beautiful-unique-validation');

const FKHelper = require('../helpers/foreign-key-helper');

const shortid = require('shortid');

var voteSchema = new Schema({
																'voters' : {
																							'type' : Array ,

																								'validate' : {
																																	'validator' : (v) => {
																																													return FKHelper.primaryKey(mongoose.model('User') , v );
																																																																										} ,

																																									'message' : `User ID reference doesn't exists in the record or is not available.`
																																				}
																																}	,
																'votes' : {
																						'type' : Number ,
																															'default' : 0 ,
																} ,

																'createdAt' : {	'type' : Date ,	
																																	'default' : Date.now 	} ,

															'entry_slug' :  {
																								'type' : String ,
																		
																	'required' : [true , 'Entry slug for Photo should be provided and cannot be empty.'] ,

																		'maxlength' : [120 , 'Entry slug cannot be greater than 120 characters in length.'] ,

																			'minlength' : [1 , 'Entry slug cannot be less than 1 character in length.'] ,

										'validate' : {
																			'validator' : (v) => {
																															return FKHelper.secondaryKey(mongoose.model(parent) , v );
																																																														} ,

																											'message' : `Entry slug reference doesn't exists in the record or is not available.`
																						}	} ,
} , {
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

								'id' : false ,

								'timestamps' : {

										'createdAt' : 'createdAt' ,

										'updatedAt' : 'updatedAt'
								} ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 2
									}
							}
);

const options = {

				'separator' : '' ,

				'symbols' : false ,

				'uric' : false ,
														'lang' : 'en' ,
																						'truncate' : 120 ,
																																'backwardCompatible' : true ,

																																'custom' : {

																																			'and' : '' , 'usd' : '' , 'the' : '' , 'then' : '' , 'them' : '' , 'they' : '' ,

																																			'is' : '' , 'am' : '', 'i' : '' , 'we' : '' , 'what' : '' , 'amp' : '' ,

																																			'or' : '' , '$' : '' , 'x2f' : '' , 'x27' : '' , 'x5c' : '' , 'quot' : '' , 'lt' : '' , 'gt' : '' , '_' : '' 
																								} 
							};

voteSchema.virtual('entry' , {

		'ref' : model ,

		'localField' : 'entry_slug' ,

		'foreignField' : 'url' ,

		'justOne' : true

});

voteSchema.virtual('users' , {

		'ref' : user ,

		'localField' : 'voters' ,

		'foreignField' : '_id' ,

		'justOne' : false

});

var uniqueAndCast = function(err , doc , next) {

		if (err.name == 'CastError') {

						next(new Error('Please provide a valid id.'));	}

		else if (err.code === 11000 && err.name === 'MongoError') {
													
						next(new Error('All fields parameters must be unique.'));		 }
		else {
						next(err)
		}
};

voteSchema.pre('save', function (next) {

	this.secondaryKey = shortid.generate();
		
		next();		});

voteSchema.post('findOne' , uniqueAndCast);

voteSchema.post('find' , uniqueAndCast);

voteSchema.post('findOneAndUpdate' , uniqueAndCast);

voteSchema.plugin(require('mongoose-autopopulate'));

voteSchema.plugin(slug , options);

mongoose.set('runValidators' , true);

		return mongoose.model(model , voteSchema , modelName);
};