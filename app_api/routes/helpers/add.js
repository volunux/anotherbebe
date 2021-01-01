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

kEncryptor = require('../../config/kEncryptor') , express = require('express') , router = express.Router();


const artCtrl = require('../../controllers/article')('Art' , 'Art');

const legendCtrl = require('../../controllers/legend');


router.get('/art/add'																		,														artCtrl.entryAdd);

router.get('/book/add'																	,														bookCtrl.entryAdd);

router.get('/dress/add'																	,														dressCtrl.dressAdd);

router.get('/festival/add'															,														festivalCtrl.festivalAdd);

router.get('/folktale/add'															,														folktaleCtrl.folktaleAdd);

router.get('/food/add'																	,														foodCtrl.foodAdd);

router.get('/history/add'																,														historyCtrl.historyAdd);

router.get('/individual/add'														,														individualCtrl.individualAdd);

router.get('/law/add'																		,														lawCtrl.lawAdd);

router.get('/legend/add'																,														legendCtrl.entryAdd);

router.get('/life/add'																	,														lifeCtrl.lifeAdd);

router.get('/mythology/add'															,														mythologyCtrl.mythologyAdd);

router.get('/oruko/add'																	,														nameCtrl.nameAdd);

router.get('/photo/add'																	,														photoCtrl.entryAdd);

router.get('/religion/add'															,														religionCtrl.religionAdd);

router.get('/sound/add'																	,														soundCtrl.soundAdd);

router.get('/video/add'																	,														videoCtrl.videoAdd);




router.post('/*'																					,														sanitizer.sanitizeBody  , 	sanitizer.cleanBody);




router.post('/'																					,														indexCtrl.addApi);

router.post('/art'																			,														artCtrl.entryAddSubmit);

router.post('/book'																			,														bookCtrl.entryAddSubmit);

router.post('/dress'																		,														dressCtrl.dressAddSubmit);

router.post('/festival'																	,														festivalCtrl.festivalAddSubmit);

router.post('/folktale'																	,														folktaleCtrl.folktaleAddSubmit);

router.post('/food'																			,														foodCtrl.foodAddSubmit);

router.post('/history'																	,														historyCtrl.historyAddSubmit);

router.post('/individual'																,														individualCtrl.individualAddSubmit);

router.post('/law'																			,														lawCtrl.lawAddSubmit);

router.post('/legend'																		,														legendCtrl.entryAddSubmit);

router.post('/life'																			,														lifeCtrl.lifeAddSubmit);

router.post('/mythology'																,														mythologyCtrl.mythologyAddSubmit);

router.post('/oruko'																		,														nameCtrl.nameAddSubmit);

router.post('/photo'																		, 													validatorCtrl.photo ,		photoCtrl.entryAddSubmit);

router.post('/religion'																	,														religionCtrl.religionAddSubmit);

router.post('/sound'																		,														soundCtrl.soundAddSubmit);

router.post('/video'																		,														videoCtrl.videoAddSubmit);

router.post('/baby'																			,														babyCtrl.babyAdd);

router.post('/century/'																	,														centuryCtrl.centuryAdd);	

router.post('/country'																	,														countryCtrl.countryAdd);	

router.post('/eyon'																			,														eyonCtrl.eyonAdd);	

router.post('/gender'																		,														genderCtrl.genderAdd);	

router.post('/genre'																		,														genreCtrl.genreAdd);	

router.post('/year/'																		,														yearCtrl.yearAdd);

router.post('/specie'																		,														specieCtrl.specieAdd);	

router.post('/region'																		,														regionCtrl.regionAdd);	

router.post('/alphabet'																	,														alphabetCtrl.alphabetAdd);	

router.post('/continent'																,														continentCtrl.continentAdd);	



router.post('/upload'																		,														uploadCtrl.uploadAddSubmit);


module.exports = router;