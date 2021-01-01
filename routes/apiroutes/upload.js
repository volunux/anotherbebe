var express = require('express') , router = express.Router() , upload = require('../controllers/upload') , dummy = require('../../app_server/controllers/dummy');

router.get('/upload'																				,														upload.uploads);
	
router.post('/upload'																				,														upload.uploadAddSubmit);
	
router.delete('/uploads/:upload'														,														upload.uploadDelete);




module.exports = router;