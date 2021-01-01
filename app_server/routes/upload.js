var express = require('express') , router = express.Router() , uploadCtrl = require('../controllers/upload') , uConfig = require('../config/upload') , uploadS3 = require('../config/upload-image') , 

multer  = require('multer') , upload = multer({ 'storage' : uploadS3.mConfig })

router.post('/upload-photo' , upload.any() , uploadCtrl.uploadPhoto);




router.get('/textform' , (req , res , next) => {

																						res.render('forms/add_forms/text_form')
})


router.post('/textform' , (req , res , next) => {

																												console.log(req.body);
})

module.exports = router;
