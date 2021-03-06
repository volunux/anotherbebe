var imageMagic = require('./mime_validator/photomagic.js') , $nameFile = require('./name_file') , key = '' , params = '' , bitmap = '' ,

objectValidation = {'objectType' : true , 'objectSize' : true , 'objectValid' : true} ,

errors = require('./errors/book') , bookPhotos = require('./buckets/s3/photo-photos') , bookS3 = require('./buckets/s3/bookS3');	

aws = require('aws-sdk') , param1 = '' , multerS3 = require('multer-s3') , s3Conf = bookPhotos();

aws.config.update(bookS3);
	
var s3 = new aws.S3();

module.exports = {

		'reqOptions' : {		'url' : 'http://localhost:3000/api/book/' ,
																																			'method' : 'GET' ,
																																													'json' : {} ,
																																																				'qs' : {}			} ,
		'checkFileUpload' : (req , res , next) => {
																									if (!req.file) {		req.body.error2 = errors.error2;		}
																				next();
		} ,

		'validate' : (req , res , next) => {

				if (req.file) {		key = req.file.key;

													params = {'Bucket' : process.env.books_bucket , 'Key' : key };
													
													s3.getObject(params , (err , data) => {	

														if (data) {

																if (data.Body) {
																									let bitmap = data.Body.toString('hex' , 0 , 4);

																													if (!imageMagic.checkMagic(bitmap , req)) {

									 								s3.deleteObject(params , (err , deleted) => {
											 																														if (err) {
											 																																				console.log(err) 			}
				 																																					else {
				 																																									objectValidation.objectType = false;

				 																																									req.body.error3 = errors.error;
				 																																										
				 																																									return next();
				 																																	}			});		}
																		else {	
																							return next();	}
									}			}				});			}
					else {
									return next();
					}
	} ,

	'checkFileSize' : (req , res , next) => {

		var imageSize = 500 * 1024 * 1024;

		if (req.file) {
												if (req.file.size > imageSize && objectValidation.objectType) {	key = req.file.key;

														params = {'Bucket' : process.env.books_bucket , 'Key' : key };

										 								 s3.deleteObject(params , (err , deleted) => {
												 																														if (err) {
												 																																				console.log(err) 			}
																																											else {
									 																																							req.body.error7 = errors.error7;

																																																	return next(); }
																																										});			}

												else if (req.file.size > imageSize) {
									 																						req.body.error7 = errors.error7;
																																							
																																							return next();		}
													else {
																	return next();		}		}
				else {
								return next();
				}
	} ,

	'addFileUpload' : (req , res , next) => {
																						if (req.file) {	
																															req.body.cover_image = req.file; }
				return next();
	} ,

	'mConfig' : multerS3({
													's3' : s3Conf ,
																			    'bucket': process.env.books_bucket ,
																					        													
																					        													'acl': 'public-read-write' , 
																			    																																'key' : (req, file, cb) => {
																																																																				fileName = $nameFile.renameFile(file.originalname);

																			     																																																cb(null, fileName)			} ,

																			    																																	'metadata' : (req , file , cb) => {
																			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															}) ,

	'delete' : (req , errArr) => {	

		if (!(req.body.error3 || req.body.error7)) {

			errArr.push(errors.error6);

			key = req.file.key , params = {'Bucket' : process.env.books_bucket , 'Key' : key };

					s3.deleteObject(params , (err , deleted) => {
																												if (err) {
																																		console.log(err) }      
						 																						else {
			 																															console.log("Successfully deleted myBucket/myKey"); }
							}); 		}	
			} 
}