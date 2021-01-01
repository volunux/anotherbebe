var multer = require('multer') , fs = require('fs') , path = require('path') , request = require('request') , soundMagic = require('./mime_validator/soundmagic.js') , $filename = require('./filename') ,

extra = require('fs-extra') , key = '' , params = '' , errors = require('./errors/sound') , soundSounds = require('./buckets/s3/sounds') , soundS3 = require('./buckets/s3/soundS3') , bitmap = '' , 

aws = require('aws-sdk') , param1 = '' , multerS3 = require('multer-s3') , s3Conf = soundSounds() ;

aws.config.update(soundS3);

var s3 = new aws.S3();

module.exports = {

		'reqOptions' : {		'url' : 'http://localhost:3000/api/sound/' ,
																																			'method' : 'GET' ,
																																													'json' : {} ,
																																																				'qs' : {}			} ,

		'mSound' :  (req , res , next) => {

				if (req.file) {
												let params = {
																				'Bucket' : 'aremi-sounds-sound' ,

																					'Key' : $filename(req.file) ,

																						'acl' : 'public-read-write' ,

																							'Body' : req.file.buffer ,

																								'ContentType' : req.file.mimetype		};

																	s3.upload(params , (err , data) => {
																																					if (err) {
																																											console.log('Error has occured' , err);		} 

																																					if (data) {	req.file = data;			}
																	}).on('httpUploadProgress', (evt) => {
																																					console.log(evt);		});					
										}
												next();
		} ,

		'checkFileUpload' : (req , res , next) => {
																									if (!req.file) {		req.body.error2 = errors.error2;		}
																				next();
		} ,

		'validate' : (req , res , next) => {
				
				if (req.file) {		key = req.file.key;

													params = {'Bucket' : 'aremi-sounds-sound' , 'Key' : key };
													
													s3.getObject(params , (err , data) => {	

														if (data) {

																if (data.Body) {
																									let bitmap = data.Body.toString('hex' , 0 , 4);

																													if (!soundMagic.checkMagic(bitmap)) {

									 								s3.deleteObject(params , (err , deleted) => {
											 																														if (err) {
											 																																				console.log(err) }      
											 																																					
											 																																					else {
								 																																												req.body.error3 = errors.error;
										 																																										
										 																																										console.log("Successfully deleted myBucket/myKey"); }
									 																									return next();
									 										});			}
																										else  {
																															return next();
												}		}			}			});
										}
					next();
	} ,



	'addFileUpload' : (req , res , next) => {
																						if (req.file) {	
																															req.body.sound_detail = req.file; }
				next();
	} ,

	'mConfig' : multerS3({
													's3' : s3Conf ,
																			    'bucket': 'aremi-sounds-sound' ,
																					        													'acl': 'public-read-write' , 
																			    																																'key' : (req, file, cb) => {
																																																																				fileName = $filename(file);
																			     																																																													 cb(null, fileName)						} ,

																			    																																	'metadata' : (req , file , cb) => {
																			    																																																				cb(null , {'fieldName' : file.fieldname})				}
															}) ,

	'delete' : (req , errArr) => {

			errArr.push({
										'location' : 'body' ,
										'param' : 'sound' ,
										'value' : '' ,
										'msg' : 'Sound have to be re-uploaded due to invalid data in other field parameters.'
			});
						key = req.file.key;
																params = {'Bucket' : 'aremi-sounds-sound' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																																					else {
																															 																																												console.log("Successfully deleted myBucket/myKey"); }
																								 										}); 
			}	 ,

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																								var soundPath = String('./public/sounds/');
																																																														cb(null, soundPath);		
																											  } ,

							'filename' : function (req , file , cb) {
																												fileName = $filename(file);
    																																									cb(null, fileName)			}
  		})

}