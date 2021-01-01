var nameCtrl = require('../../controllers/name') , dressCtrl = require('../../controllers/dress') , foodCtrl = require('../../controllers/food') , lifeCtrl = require('../../controllers/life') , obj = {} ,

festivalCtrl = require('../../controllers/festival') , historyCtrl = require('../../controllers/history') , religionCtrl = require('../../controllers/religion') , 

mythologyCtrl = require('../../controllers/mythology') , lawCtrl = require('../../controllers/law') , warCtrl = require('../../controllers/war') , 

folktaleCtrl = require('../../controllers/folktale') , proverbCtrl = require('../../controllers/proverb') , videoCtrl = require('../../controllers/video') , 

bookCtrl = require('../../controllers/book') , entryCtrl = require('../../controllers/entries') , userCtrl = require('../../controllers/user') , countryCtrl = require('../../controllers/country') , 

genderCtrl = require('../../controllers/gender') , alphabetCtrl = require('../../controllers/alphabet')  , babyCtrl = require('../../controllers/baby') , eyonCtrl = require('../../controllers/eyon') , 

specieCtrl = require('../../controllers/specie') , centuryCtrl = require('../../controllers/century') , individualCtrl = require('../../controllers/individual') , regionCtrl = require('../../controllers/region') , 

photoCtrl = require('../../controllers/photo') , uploadCtrl = require('../../controllers/upload') , genreCtrl = require('../../controllers/genre') , continentCtrl = require('../../controllers/continent') , 

indexCtrl = require('../../controllers/index') , authenticationCtrl = require('../../controllers/authentication') , soundCtrl = require('../../controllers/sound') , yearCtrl = require('../../controllers/year') , 

vAuth = require('../../config/verifyAuthentication') , validatorCtrl = require('../../models/validators_ctrl/validator') , sanitizer = require('../../models/sanitizers/sanitizer') ,

deleteCtrl = require('../../controllers/update') , kEncryptor = require('../../config/kEncryptor') , express = require('express') , router = express.Router();



const artCtrl = require('../../controllers/article')('Art' , 'Art');

const legendCtrl = require('../../controllers/legend');


router.delete('/'																,														indexCtrl.deleteApi);

router.delete('/alphabet/'											,														deleteCtrl.alphabet);

router.delete('/art/'														,														deleteCtrl.art);

router.delete('/baby/'													,														deleteCtrl.baby);

router.delete('/book/'													,														deleteCtrl.book);

router.delete('/century/'												,														deleteCtrl.century);

router.delete('/continent/'											,														deleteCtrl.continent);

router.delete('/country/'												,														deleteCtrl.country);

router.delete('/dress/'													,														deleteCtrl.dress);

router.delete('/eyon/'													,														deleteCtrl.eyon);

router.delete('/festival/'											,														deleteCtrl.festival);

router.delete('/folktale/'											,														deleteCtrl.folktale);

router.delete('/food/'													,														deleteCtrl.food);

router.delete('/gender/'												,														deleteCtrl.gender);

router.delete('/genre/'													,														deleteCtrl.genre);

router.delete('/history/'												,														deleteCtrl.history);

router.delete('/individual/'										,														deleteCtrl.individual);

router.delete('/law/'														,														deleteCtrl.law);

router.delete('/language/'											,														deleteCtrl.language);

router.delete('/legend/'												,														deleteCtrl.legend);

router.delete('/life/'													,														deleteCtrl.life);

router.delete('/mythology/'											,														deleteCtrl.mythology);

router.delete('/oruko/'													,														deleteCtrl.name);

router.delete('/photo/'													,														deleteCtrl.photo);

router.delete('/proverb/'												,														deleteCtrl.proverb);

router.delete('/religion/'											,														deleteCtrl.religion);

router.delete('/region/'												,														deleteCtrl.region);

router.delete('/sound/'													,														deleteCtrl.sound);

router.delete('/specie/'												,														deleteCtrl.specie);

router.delete('/video/'													,														deleteCtrl.video);

router.delete('/war/'														,														deleteCtrl.war);

router.delete('/year/'													,														deleteCtrl.year);


router.delete('/photo/o/:object'													,														photoCtrl.objectDelete);

router.delete('/book/o/:object'														,														bookCtrl.objectDelete);

router.delete('/sound/o/:object'													,														soundCtrl.objectDelete);

router.delete('/user/o/:object'														,														userCtrl.objectDelete);

router.delete('/video/o/:object'													,														videoCtrl.objectDelete);



router.delete('/alphabet/:alphabet'											,														alphabetCtrl.alphabetDelete);



router.get('/art/delete/:article'												,														artCtrl.entryDelete);

router.delete('/art/:article'														,														artCtrl.entryDeleteSubmit);



router.delete('/book/:book'															,														bookCtrl.entryDelete);

router.delete('/dress/:dress'														,														dressCtrl.dressDelete);

router.delete('/festival/:festival'											,														festivalCtrl.festivalDelete);

router.delete('/folktale/:folktale'											,														folktaleCtrl.folktaleDelete);

router.delete('/food/:food'															,														foodCtrl.foodDelete);

router.delete('/history/:history'												,														historyCtrl.historyDelete);

router.delete('/individual/:individual'									,														individualCtrl.individualDelete);

router.delete('/law/:law'																,														lawCtrl.lawDelete);

router.get('/legend/delete/:legend'											,														legendCtrl.entryDelete);

router.delete('/legend/:legend'													,														legendCtrl.entryDeleteSubmit);

router.delete('/life/:life'															,														lifeCtrl.lifeDelete);

router.delete('/mythology/:mythology'										,														mythologyCtrl.mythologyDelete);



router.get('/oruko/delete/:name'												,														nameCtrl.nameDelete);

router.delete('/oruko/:name'														,														nameCtrl.nameDeleteSubmit);


router.get('/photo/delete/:photo'												,														photoCtrl.entryDelete);

router.delete('/photo/:photo'														, 													photoCtrl.entryDeleteSubmit);

router.delete('/religion/:religion'											,														religionCtrl.religionDelete);

router.delete('/sound/:sound'														,														soundCtrl.soundDelete);

router.delete('/video/:video'														,														videoCtrl.videoDelete);



router.delete('/baby/:baby'															,														babyCtrl.babyDelete);

router.delete('/country/:country'												,														countryCtrl.countryDelete);

router.delete('/eyon/:eyon'															,														eyonCtrl.eyonDelete);

router.delete('/gender/:gender'													,														genderCtrl.genderDelete);

router.delete('/specie/:specie'													,														specieCtrl.specieDelete);

router.delete('/uploads/:upload'												,														uploadCtrl.uploadDelete);



module.exports = router;