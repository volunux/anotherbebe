var nameCtrl = require('../../controllers/name') , dressCtrl = require('../../controllers/dress') , foodCtrl = require('../../controllers/food') , lifeCtrl = require('../../controllers/life') , obj = {} ,

festivalCtrl = require('../../controllers/festival') , historyCtrl = require('../../controllers/history') , religionCtrl = require('../../controllers/religion') , 

mythologyCtrl = require('../../controllers/mythology') , lawCtrl = require('../../controllers/law') , warCtrl = require('../../controllers/war') , legendCtrl = require('../../controllers/legend') , 

folktaleCtrl = require('../../controllers/folktale') , proverbCtrl = require('../../controllers/proverb') , videoCtrl = require('../../controllers/video') , 

bookCtrl = require('../../controllers/book') ,countryCtrl = require('../../controllers/country') , genderCtrl = require('../../controllers/gender') , alphabetCtrl = require('../../controllers/alphabet')  , 

babyCtrl = require('../../controllers/baby') , eyonCtrl = require('../../controllers/eyon') ,  specieCtrl = require('../../controllers/specie') , centuryCtrl = require('../../controllers/century') , 

individualCtrl = require('../../controllers/individual') , regionCtrl = require('../../controllers/region') , photoCtrl = require('../../controllers/photo') , genreCtrl = require('../../controllers/genre') , 

continentCtrl = require('../../controllers/continent') , soundCtrl = require('../../controllers/sound') , yearCtrl = require('../../controllers/year') , express = require('express') , router = express.Router();



const artCtrl = require('../../controllers/helpers/comment')('Art' , 'Art' , 'ArtComment' , 'art');




router.get('/photo/d/:photo/comment'												,														photoCtrl.entryComment);

router.get('/photo/d/:photo/comment/d/:comment'							,														photoCtrl.entryCommentDetail);


router.get('/art/d/:article/comment'												,														artCtrl.entryComment);

router.get('/art/d/:article/comment/d/:comment'							,														artCtrl.entryCommentDetail);



module.exports = router;