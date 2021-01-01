var multer = require('multer') , key = '' , params = '' , errors = require('./errors') , userPhotos = require('./buckets/s3/user-photos') , userS3 = require('./buckets/s3/userS3') , bitmap = '' , 

aws = require('aws-sdk') , param1 = '' , multerS3 = require('multer-s3') , s3Conf = userPhotos();

aws.config.update(userS3);

var s3 = new aws.S3();


module.exports = {

	'delete' : (uImgPath) => {

	  var modImgPath = uImgPath.split('/') , key = modImgPath.pop();

																params = {'Bucket' : 'aremi-user-photos' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																																					else {
																															 																																												console.log("Successfully deleted myBucket/myKey"); }
																								 										}); 
			} ,

	'objectDelete' : (key) => {
																params = {'Bucket' : 'aremi-user-photos' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													return 'Object successfully deleted.'; }
																								 										}); 
			} 


}