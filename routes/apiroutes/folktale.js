var express = require('express') , router = express.Router() , folktale = require('../controllers/folktale') , dummy = require('../../app_server/controllers/dummy');

router.get('/folktale'																					,														folktale.folktales);

router.post('/folktale'																					,														folktale.folktaleAddSubmit);





router.get('/folktale/add'																			,														folktale.folktaleAdd);

router.get('/folktale/okan/:folktale'														,														folktale.folktaleName);

router.get('/folktale/:folktale/update'													,														folktale.folktaleUpdate);




router.get('/folktale/country/:country/'												,														folktale.folktaleCountry);

router.get('/folktale/ethnic/:ethnic/'													,														folktale.folktaleEthnic);



router.get('/folktale/:folktale/'																,														folktale.folktaleDetail);

router.put('/folktale/:folktale'																,														folktale.folktaleUpdateSubmit);

router.delete('/folktale/:folktale'															,														folktale.folktaleDelete);



//router.get('/folktale/:ethnic/alphabet/'												,														folktale.folktaleByAlphabet);


module.exports = router;