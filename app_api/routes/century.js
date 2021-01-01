var router = require('express').Router() , century = require('../controllers/century');



router.get('/century'																						,										century.centuryList);

router.get('/century/name/:century'															,										century.centuryName);

router.post('/century'																					,										century.centuryAdd);	



router.get('/century/d/:century'																,										century.centuryDetail);

router.put('/century/:century'																	,										century.centuryUpdate);

router.delete('/century/:century'																,										century.centuryDelete);




module.exports = router;