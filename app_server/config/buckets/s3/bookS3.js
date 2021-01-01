module.exports = {
		
	'secretAccessKey': process.env.books_photo_secretkey ,
	
	'accessKeyId': process.env.books_photo_accesskey ,

	'region' : process.env.books_region ,

	'Bucket' : process.env.books_bucket ,

	'httpOptions' : {

			'timeout' : 86400000 ,

			'connectTimeout' : 12000
	}

}