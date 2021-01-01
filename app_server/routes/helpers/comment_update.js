var express = require('express') , router = express.Router() , book = require('../../controllers/book') ,

dress = require('../../controllers/dress') , festival = require('../../controllers/festival') , folktale = require('../../controllers/folktale') , food = require('../../controllers/food') , 

law = require('../../controllers/law') , history = require('../../controllers/history') , history = require('../../controllers/history') , individual = require('../../controllers/individual') , 

legend = require('../../controllers/legend') , life = require('../../controllers/life') , mythology = require('../../controllers/mythology') , name = require('../../controllers/name') , 

sound = require('../../controllers/sound') , proverb = require('../../controllers/proverb') , religion = require('../../controllers/religion') , 

video = require('../../controllers/video');

const photo = require('../../controllers/helpers/comment')('Photo' , 'photo');

const art = require('../../controllers/helpers/comment')('Art' , 'art');




router.get('/photo/:photo/comment/:comment/update'						,											photo.entryCommentUpdate);

router.post('/photo/:photo/comment/:comment/update'						,											photo.entryCommentUpdateSubmit);



router.get('/art/:article/comment/:comment/update'						,											art.entryCommentUpdateArticle);

router.post('/art/:article/comment/:comment/update'						,											art.entryCommentUpdateSubmitArticle);


module.exports = router;