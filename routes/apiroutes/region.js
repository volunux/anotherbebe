var express = require('express'),			router = express.Router(),		region = require('../controllers/region');



router.get('/region'											,		region.regionList);

//router.get('/region/name/:region'				,		region.regionName);

router.post('/region'											,		region.regionAdd);	




//router.get('/region/:region'						,		region.regionDetail);

//router.put('/region/:region'						,		region.regionUpdate);

//router.delete('/region/:region'					,		region.regionDelete);




module.exports = router;