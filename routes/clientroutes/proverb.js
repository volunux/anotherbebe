var express = require('express') , router = express.Router() , proverb = require('../controllers/proverb');


router.get('/'																								,														proverb.proverbs);


router.get('/:ethnic'																					,														proverb.proverbDetail);




//router.get('/:proverb/update'																,														proverb.proverbUpdate);

//router.post('/:proverb/update'															,														proverb.proverbUpdateSubmit);



//router.get('/:proverb/delete'																,														proverb.proverbDelete);

//router.post('/:proverb/delete'															,														proverb.proverbDeleteSubmit);



module.exports = router;