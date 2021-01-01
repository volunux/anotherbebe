var express = require('express') , router = express.Router() , uploadS3 = require('../config/upload-image') ,

data = '' , url = '' , authentication = require('../controllers/authentication/authentication') , indexCtrl = require('../controllers/index'); 


router.get('/'																				, 													indexCtrl.all);


router.get('/nation'																	, 													indexCtrl.ethnicList);

router.get('/country'																	, 													indexCtrl.countryList);

router.get('/nation/:ethnic'													, 													indexCtrl.ethnicEntries);

router.get('/country/:country'												, 													indexCtrl.countryEntries);



router.get('/signup' 																	, 													authentication.register);

router.get('/signin' 																	, 													authentication.login);

router.get('/signout' 																, 													authentication.logout);

router.post('/signin' 																, 													authentication.loginSubmit);

router.post('/signup' 																, 													authentication.registerSubmit);




router.post('/form' , uploadS3.delete , (req , res , next) => {
		
						res.status(200).json({'message' : 'Image successfully deleted.'});
});

router.post('/delete/objects' , uploadS3.deleteMultiple , (req , res , next) => {
		
						res.status(200).json({'message' : 'Images successfully deleted.'});
});





module.exports = router;
