const aws = require('aws-sdk');

module.exports = function postPhotos() {

				return new aws.S3({
													    'secretAccessKey': process.env.sounds_sound_secretkey ,

													    'accessKeyId': process.env.sounds_sound_accesskey ,

													    'region' : process.env.sounds_region ,

													    'Bucket' : process.env.sounds_bucket ,

															'httpOptions' : {

																	'timeout' : 86400000 ,

																	'connectTimeout' : 12000
															}
});

}