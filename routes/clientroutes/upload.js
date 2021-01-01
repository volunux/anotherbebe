var express = require('express') , router = express.Router() , upload = require('../controllers/upload') , dummy = require('../controllers/dummy');

router.post('/upload-photo' , upload.uploadSubmit);




router.get('/textform' , (req , res , next) => {

																						res.render('forms/add_forms/text_form')
})


router.post('/textform' , (req , res , next) => {

																												console.log(req.body);
})

module.exports = router;
