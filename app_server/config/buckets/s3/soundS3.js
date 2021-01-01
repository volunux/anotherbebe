module.exports = {
    
    'secretAccessKey': process.env.sounds_sound_secretkey ,

    'accessKeyId': process.env.sounds_sound_accesskey ,

    'region' : process.env.sounds_region ,

    'Bucket' : process.env.sounds_bucket ,

		'httpOptions' : {

				'timeout' : 86400000 ,

				'connectTimeout' : 12000
		}

}