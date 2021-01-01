var express = require('express'),			router = express.Router(),		gender = require('../controllers/gender');



router.get('/gender'										,		gender.genderList);

router.get('/gender/name/:gender'				,		gender.genderName);

router.post('/gender'										,		gender.genderAdd);	



router.get('/gender/:gender'						,		gender.genderDetail);

router.put('/gender/:gender'						,		gender.genderUpdate);

router.delete('/gender/:gender'					,		gender.genderDelete);




module.exports = router;