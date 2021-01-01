var multer = require('multer') , fs = require('fs') , path = require('path') , request = require('request') , videoMagic = require('./mime_validator/videomagic.js') , $filename = require('./filename') ,

extra = require('fs-extra') , key = '' , params = '' , errors = require('./errors/video') , videoVideos = require('./buckets/s3/videos') , videoS3 = require('./buckets/s3/videoS3') , bitmap = '' , 

aws = require('aws-sdk') , param1 = '' , multerS3 = require('multer-s3') , s3Conf = videoVideos();

aws.config.update(videoS3);

var s3 = new aws.S3();

module.exports = {

		'reqOptions' : {		'url' : 'http://localhost:3000/api/video/' ,
																																			'method' : 'GET' ,
																																													'json' : {} ,
																																																				'qs' : {}			} ,

		'mVideo' :  (req , res , next) => {

				if (req.file) {
												let params = {
																				'Bucket' : 'aremi-videos-video' ,

																					'Key' : $filename(req.file) ,

																						'acl' : 'public-read-write' ,

																							'Body' : req.file.buffer ,

																								'ContentType' : req.file.mimetype		};

																	s3.upload(params , (err , data) => {
																																					if (err) {
																																											console.log('Error has occured' , err);		} 

																																					if (data) {	req.file = data;		}
																}).on('httpUploadProgress' , (evt) => {
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

													params = {'Bucket' : 'aremi-videos-video' , 'Key' : key };
													
													s3.getObject(params , (err , data) => {	

														if (err) {
																				console.log(err);
														}

														if (data) {

																if (data.Body) {
																									let bitmap = data.Body.toString('hex' , 0 , 4);

																													if (!videoMagic.checkMagic(bitmap)) {

									 								s3.deleteObject(params , (err , deleted) => {
											 																														if (err) {
											 																																				console.log(err) }      
											 																																					
						 																																					else {
			 																																												req.body.error3 = errors.error;
					 																																										
					 																																										console.log("Successfully deleted myBucket/myKey"); }
									 																					});		}		}			}			});
										}
					next();
	} ,



	'addFileUpload' : (req , res , next) => {
																						if (req.file) {	
																															req.body.video_detail = req.file; }
				next();
	} ,

	'mConfig' : multerS3({
													's3' : s3Conf ,
																			    'bucket': 'aremi-videos-video' ,
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
										'param' : 'video' ,
										'value' : '' ,
										'msg' : 'Video have to be re-uploaded due to invalid data in other field parameters.'
			});
						key = req.file.key;
																params = {'Bucket' : 'aremi-videos-video' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																																					else {
																															 																																												console.log("Successfully deleted myBucket/myKey"); }
																								 										}); 
			}	 ,

	'multer' :  multer.diskStorage({
 																		'destination' : function (req, file, cb) {
																																								var videoPath = String('./public/videos/');
																																																														cb(null, videoPath);		
																											  } ,

							'filename' : function (req , file , cb) {
																												fileName = $filename(file);
    																																									cb(null, fileName)			}
  		})

}