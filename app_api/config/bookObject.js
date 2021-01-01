var path = require('path') , key = '' , params = '' , bitmap = '' , param1 = '' , multerS3 = require('multer-s3') , aws = require('aws-sdk') , s3 = '' ,

bookPhotos = require('../../app_server/config/buckets/s3/book-photos') , bookS3 = require('../../app_server/config/buckets/s3/bookS3') ,  s3Conf = bookPhotos();

aws.config.update(bookS3);

s3 = new aws.S3();

module.exports = {

	'delete' : (bImgPath) => {

	  var modImgPath = bImgPath.split('/') , key = bImgPath.pop();

																params = {'Bucket' : 'aremi-book-photos' , 'Key' : key };

																								 								s3.deleteObject(params , (err , deleted) => {
																									 																														if (err) {
																									 																																				console.log(err) }      
																																		 																						else {
																															 																													return 'Object successfully deleted.'; }
																								 										}); 
			} 


}