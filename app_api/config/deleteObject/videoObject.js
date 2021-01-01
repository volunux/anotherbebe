var path = require('path') , key = '' , params = '' , bitmap = '' , param1 = '' , multerS3 = require('multer-s3') , aws = require('aws-sdk') , s3 = '' ,

videoVideos = require('../../../app_server/config/buckets/s3/videos') , videoS3 = require('../../../app_server/config/buckets/s3/videoS3') ,  s3Conf = videoVideos();

aws.config.update(videoS3);

s3 = new aws.S3();

module.exports = {

	'delete' : (vidPath) => {

	  var modVidPath = vidPath.split('/') , key = modVidPath.pop();

																params = {'Bucket' : 'aremi-videos' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													return 'Object successfully deleted.'; }
																								 																	}); 
			} ,

	'objectDelete' : (req , res , key) => {
																params = {'Bucket' : 'aremi-videos-video' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													res.status(200).send({'message' : 'Object successfully deleted.'}); }
																								 										}); 
			} 
}