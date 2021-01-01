var nameCtrl = require('../../controllers/name') , dressCtrl = require('../../controllers/dress') , foodCtrl = require('../../controllers/food') , lifeCtrl = require('../../controllers/life') , obj = {} ,

festivalCtrl = require('../../controllers/festival') , historyCtrl = require('../../controllers/history') , religionCtrl = require('../../controllers/religion') , 

mythologyCtrl = require('../../controllers/mythology') , lawCtrl = require('../../controllers/law') , warCtrl = require('../../controllers/war') , legendCtrl = require('../../controllers/legend') , 

folktaleCtrl = require('../../controllers/folktale') , proverbCtrl = require('../../controllers/proverb') , videoCtrl = require('../../controllers/video') , 

bookCtrl = require('../../controllers/book') , entryCtrl = require('../../controllers/entries') , userCtrl = require('../../controllers/user') , countryCtrl = require('../../controllers/country') , 

genderCtrl = require('../../controllers/gender') , alphabetCtrl = require('../../controllers/alphabet')  , babyCtrl = require('../../controllers/baby') , eyonCtrl = require('../../controllers/eyon') , 

specieCtrl = require('../../controllers/specie') , centuryCtrl = require('../../controllers/century') , individualCtrl = require('../../controllers/individual') , regionCtrl = require('../../controllers/region') , 

photoCtrl = require('../../controllers/photo') , uploadCtrl = require('../../controllers/upload') , genreCtrl = require('../../controllers/genre') , continentCtrl = require('../../controllers/continent') , 

indexCtrl = require('../../controllers/index') , authenticationCtrl = require('../../controllers/authentication') , soundCtrl = require('../../controllers/sound') , yearCtrl = require('../../controllers/year') , 

vAuth = require('../../config/verifyAuthentication') , kEncryptor = require('../../config/kEncryptor') , express = require('express') , router = express.Router();


const artCtrl = require('../../controllers/helpers/reply')('Art' , 'Art' , 'ArtComment' , 'ArtReply' , 'art');




router.get('/photo/d/:photo/comment/d/:comment/reply/add'						,														photoCtrl.entryAddReplytoComment);

router.post('/photo/d/:photo/comment/d/:comment/reply'							,														photoCtrl.entryAddReplyToCommentSubmit);


router.get('/art/d/:article/comment/d/:comment/reply/add'						,														artCtrl.entryAddReplytoComment);

router.post('/art/d/:article/comment/d/:comment/reply'							,														artCtrl.entryAddReplyToCommentSubmit);



module.exports = router;