module.exports = {
		
		'secretAccessKey': process.env.videos_video_secretkey ,

		'accessKeyId': process.env.videos_video_accesskey ,

		'region' : process.env.videos_region ,

		'Bucket' : process.env.videos_bucket ,

		'httpOptions' : {

				'timeout' : 86400000 ,

				'connectTimeout' : 12000
		}

}