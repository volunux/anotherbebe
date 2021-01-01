var express = require('express') , router = express.Router() , uploader = require('../controllers/uploader');


router.get('/'																							,														uploader.file);

router.post('/sign/photo/:filename/'												,														uploader.signPhoto);

router.post('/sign/book/:filename/'													,														uploader.signBook);

router.post('/sign/sound/:filename/'												,														uploader.signedUrl);

router.post('/sign/user/:filename/'													,														uploader.signedUrl);

router.post('/sign/video/:filename/'												,														uploader.signedUrl);

router.post('/'																							,														uploader.file);

module.exports = router;