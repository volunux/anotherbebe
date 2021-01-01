var express = require('express') , router = express.Router() , axios = require('axios') , uConfig = require('../config/upload') , uploadS3 = require('../config/upload-image') , multer  = require('multer') ,

upload = multer({ 'storage' : uploadS3.mConfig }) , data = '' , iConfig = require('../config/index') , url = '' , authentication = require('../controllers/authentication/authentication');


router.get('/', (req, res, next) => { url = `${iConfig.reqOptions.url}all`;
	
		axios.get(url)
									.then((response) => {	data = response.data.status , festival = data.Festival , life = data.Life , folktale = data.Folktale , food = data.Food , art = data.Art;

										// console.log(req.app.get('meme'));

																															res.render('all' , { 'title' : 'Aiye' , 'festivals' : festival , 'lifes' : life , 'folktales' : folktale , 'foods' : food , 'arts' : art	});		})
									.catch((err) => { status = err.response;
																															res.render('error' , {'title' : 'Error' , 'error' : status 	})	
						})
});


router.post('/upload-photo' ,  upload.any() , function(req , res) {

			axios({   'method': 'post' ,
																		'url' : uConfig.reqOptions.url ,
																																			'data' : req.files[0]   })

					.then((response) => { var data = response.data.status.location;
																																							res.send({'link' : data});       
					})
						.catch((err) => {
																			res.json({'error' : 'An Error has occured.'})
						})

});



router.post('/form' , uploadS3.delete , (req , res , next) => {
		
						res.send({'sucess' : 'Image successfully deleted.'});
});

router.get('/signup' 																						, 													authentication.register);

router.get('/signin' 																						, 													authentication.login);

router.get('/signout' 																					, 													authentication.logout);

router.post('/signin' 																					, 													authentication.loginSubmit);

router.post('/signup' 																					, 													authentication.registerSubmit);


module.exports = router;
