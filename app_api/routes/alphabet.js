var router = require('express').Router() , alphabet = require('../controllers/alphabet');



router.get('/alphabet'																						,										alphabet.alphabetList);

router.get('/alphabet/name/:alphabet'															,										alphabet.alphabetName);

router.post('/alphabet'																						,										alphabet.alphabetAdd);	



router.get('/alphabet/d/:alphabet'																,										alphabet.alphabetDetail);

router.put('/alphabet/:alphabet'																	,										alphabet.alphabetUpdate);

router.delete('/alphabet/:alphabet'																,										alphabet.alphabetDelete);




module.exports = router;