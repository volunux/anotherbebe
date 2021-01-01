var multer = require('multer') , fs = require('fs') , path = require('path');

uuidv4 = require('uuid/v4') , fileName = '';


module.exports = {

		'getFileExtension' : (file) => {
																	
																	var ext =  path.extname(file)
																																	return ext;
		} ,

		'renameFile' : (file) => {
																	var ext =  path.extname(file);

																	fileName = uuidv4() + ext;



																	return fileName;				
		}

}

																	console.log(typeof uuidv4());