const aws = require('aws-sdk');

module.exports = function postPhotos() {

				return new aws.S3({
															'secretAccessKey': process.env.aremiuser_secretkey ,

															'accessKeyId': process.env.aremiuser_secretkey ,

															'region' : process.env.videos_region ,

															'Bucket' : process.env.videos_bucket ,

															'httpOptions' : {

																	'timeout' : 86400000 ,

																	'connectTimeout' : 12000
															}
});

}