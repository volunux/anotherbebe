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

updateCtrl = require('../../controllers/update') , kEncryptor = require('../../config/kEncryptor') , express = require('express') , router = express.Router();





const artCtrl = require('../../controllers/article')('Art' , 'Art');

const legendCtrl = require('../../controllers/legend');



router.put('/'															,														indexCtrl.updateApi);

router.put('/alphabet/'											,														updateCtrl.alphabet);

router.put('/art/'													,														updateCtrl.art);

router.put('/baby/'													,														updateCtrl.baby);

router.put('/book/'													,														updateCtrl.book);

router.put('/century/'											,														updateCtrl.century);

router.put('/continent/'										,														updateCtrl.continent);

router.put('/country/'											,														updateCtrl.country);

router.put('/dress/'												,														updateCtrl.dress);

router.put('/eyon/'													,														updateCtrl.eyon);

router.put('/festival/'											,														updateCtrl.festival);

router.put('/folktale/'											,														updateCtrl.folktale);

router.put('/food/'													,														updateCtrl.food);

router.put('/gender/'												,														updateCtrl.gender);

router.put('/genre/'												,														updateCtrl.genre);

router.put('/history/'											,														updateCtrl.history);

router.put('/individual/'										,														updateCtrl.individual);

router.put('/law/'													,														updateCtrl.law);

router.put('/language/'											,														updateCtrl.language);

router.put('/legend/'												,														updateCtrl.legend);

router.put('/life/'													,														updateCtrl.life);

router.put('/mythology/'										,														updateCtrl.mythology);

router.put('/oruko/'												,														updateCtrl.name);

router.put('/photo/'												,														updateCtrl.photo);

router.put('/proverb/'											,														updateCtrl.proverb);

router.put('/religion/'											,														updateCtrl.religion);

router.put('/region/'												,														updateCtrl.region);

router.put('/sound/'												,														updateCtrl.sound);

router.put('/specie/'												,														updateCtrl.specie);

router.put('/video/'												,														updateCtrl.video);

router.put('/war/'													,														updateCtrl.war);

router.put('/year/'													,														updateCtrl.year);





router.get('/art/update/:article'												,														artCtrl.entryUpdate);

router.put('/art/:article'															,														artCtrl.entryUpdateSubmit);



router.get('/book/update/:book'													,														bookCtrl.entryUpdate);

router.put('/book/:book'																,														bookCtrl.entryUpdateSubmit);



router.get('/dress/update/:dress'												,														dressCtrl.dressUpdate);

router.put('/dress/:dress'															,														dressCtrl.dressUpdateSubmit);



router.get('/festival/update/:festival'									,														festivalCtrl.festivalUpdate);

router.put('/festival/:festival'												,														festivalCtrl.festivalUpdateSubmit);



router.get('/folktale/update/:folktale'									,														folktaleCtrl.folktaleUpdate);

router.put('/folktale/:folktale'												,														folktaleCtrl.folktaleUpdateSubmit);



router.get('/food/update/:food'													,														foodCtrl.foodUpdate);

router.put('/food/:food'																,														foodCtrl.foodUpdateSubmit);



router.get('/history/update/:history'										,														historyCtrl.historyUpdate);

router.put('/history/:history'													,														historyCtrl.historyUpdateSubmit);



router.get('/individual/update/:individual'							,														individualCtrl.individualUpdate);

router.put('/individual/:individual'										,														individualCtrl.individualUpdateSubmit);



router.get('/law/update/:law'														,														lawCtrl.lawUpdate);

router.put('/law/:law'																	,														lawCtrl.lawUpdateSubmit);



router.get('/legend/update/:legend'											,														legendCtrl.entryUpdate);

router.put('/legend/:legend'														,														legendCtrl.entryUpdateSubmit);



router.get('/life/update/:life'													,														lifeCtrl.lifeUpdate);

router.put('/life/:life'																,														lifeCtrl.lifeUpdateSubmit);



router.get('/mythology/update/:mythology'								,														mythologyCtrl.mythologyUpdate);

router.put('/mythology/:mythology'											,														mythologyCtrl.mythologyUpdateSubmit);



router.get('/oruko/update/:name/'												,														nameCtrl.nameUpdate);

router.put('/oruko/:name'																,														nameCtrl.nameUpdateSubmit);



router.get('/photo/update/:photo'												,														photoCtrl.entryUpdate);

router.put('/photo/:photo'															,														photoCtrl.entryUpdateSubmit);



router.get('/religion/update/:religion'									,														religionCtrl.religionUpdate);

router.put('/religion/:religion'												,														religionCtrl.religionUpdateSubmit);



router.get('/sound/update/:sound'												,														soundCtrl.soundUpdate);

router.put('/sound/:sound'															,														soundCtrl.soundUpdateSubmit);



router.get('/video/update/:video'												,														videoCtrl.videoUpdate);

router.put('/video/:video'															,														videoCtrl.videoUpdateSubmit);



router.put('/baby/:baby'																,														babyCtrl.babyUpdate);

router.put('/country/:country'													,														countryCtrl.countryUpdate);

router.put('/eyon/:eyon'																,														eyonCtrl.eyonUpdate);

router.put('/gender/:gender'														,														genderCtrl.genderUpdate);

router.put('/specie/:specie'														,														specieCtrl.specieUpdate);

router.put('/alphabet/:alphabet'												,														alphabetCtrl.alphabetUpdate);


module.exports = router;