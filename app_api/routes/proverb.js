var express = require('express') , router = express.Router() , proverb = require('../controllers/proverb') , dummy = require('../../app_server/controllers/dummy');

router.get('/proverb'																				,														proverb.proverbs);

router.post('/proverb'																			,														proverb.proverbAddSubmit);




router.get('/proverb/add'																		,														proverb.proverbAdd);

router.get('/proverb/okan/:proverb'													,														proverb.proverbName);

router.get('/proverb/update/:proverb'												,														proverb.proverbUpdate);





router.get('/proverb/:ethnic/'															,														proverb.proverbDetail);

router.put('/proverb/:proverb'															,														proverb.proverbUpdateSubmit);

router.delete('/proverb/:proverb'														,														proverb.proverbDelete);



//router.get('/proverb/:ethnic/alphabet/'										,														proverb.proverbByAlphabet);


module.exports = router;