var express = require('express') , router = express.Router() , book = require('../../controllers/book') ,

dress = require('../../controllers/dress') , festival = require('../../controllers/festival') , folktale = require('../../controllers/folktale') , food = require('../../controllers/food') , law = require('../../controllers/law') ,

history = require('../../controllers/history') , history = require('../../controllers/history') , individual = require('../../controllers/individual') , legend = require('../../controllers/legend') ,

life = require('../../controllers/life') , mythology = require('../../controllers/mythology') , name = require('../../controllers/name') , sound = require('../../controllers/sound') ,

proverb = require('../../controllers/proverb') , religion = require('../../controllers/religion') , video = require('../../controllers/video');

const photo = require('../../controllers/helpers/reply')('Photo' , 'photo');

const art = require('../../controllers/helpers/reply')('Art' , 'art');


router.get('/photo/:photo/comment/:comment/reply/:reply/delete'														,											photo.entryReplyDelete);

router.post('/photo/:photo/comment/:comment/reply/:reply/delete'													,											photo.entryReplyDeleteSubmit);



router.get('/art/:article/comment/:comment/reply/:reply/delete'														,											art.entryReplyUpdateArticle);

router.post('/art/:article/comment/:comment/reply/:reply/delete'													,											art.entryReplyUpdateSubmitArticle);


module.exports = router;