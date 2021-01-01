var path = require('path') , key = '' , params = '' , bitmap = '' , param1 = '' , multerS3 = require('multer-s3') , aws = require('aws-sdk') , s3 = '' ,

soundSounds = require('../../../app_server/config/buckets/s3/sounds') , soundS3 = require('../../../app_server/config/buckets/s3/soundS3') ,  s3Conf = soundSounds();

aws.config.update(soundS3);

s3 = new aws.S3();

module.exports = {

	'delete' : (souPath) => {

	  var modSouPath = souPath.split('/') , key = modSouPath.pop();

																params = {'Bucket' : 'aremi-sounds' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													return 'Object successfully deleted.'; }
																								 																	}); 
			} ,

	'objectDelete' : (key) => {
																params = {'Bucket' : 'aremi-sounds-sound' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													return 'Object successfully deleted.'; }
																								 										}); 
			} 
}