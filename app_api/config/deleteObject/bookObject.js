var key = '' , params = '' , aws = require('aws-sdk') , s3 = '' , Upload = require('../../models/upload') , bookS3 = require('../../../app_server/config/buckets/s3/bookS3') , config = require('../config');

aws.config.update(bookS3);

s3 = new aws.S3();

module.exports = {

	'delete' : (imgPath) => {

	  var modImgPath = imgPath.split('/') , key = modImgPath.pop();

																params = {'Bucket' : process.env.books_bucket , 'Key' : key };

						s3.deleteObject(params , (err , deleted) => {
																													if (err) {
																																			console.log(err) }      
							 																						else {
								Upload.deleteOne({'Key' : key})
																								.exec((err , result) => {					
															if (err) {
																						console.log(err);		}

																						return 'Object successfully deleted.';		});		 }		}); 
	} ,

	'objectDelete' : (req , res , next , key) => {

																params = {'Bucket' : process.env.books_bucket , 'Key' : key };

						s3.deleteObject(params , (err , deleted) => {
																													if (err) {
																																			console.log(err) }      
							 																						else {
								Upload.deleteOne({'Key' : key})
																								.exec((err , result) => {
															if (err) {
																						console.log(err);		}

																						return config.response(res , 200 , {'message' : 'Object successfully deleted.'})		});		}		}); 
			} 


}