var express = require('express') , router = express.Router() , axios = require('axios') , multer  = require('multer') , emailCtrl = require('../controllers/email'); 


router.get('/create'								,														emailCtrl.createEmail);

router.get('/send'									,														emailCtrl.sendEmail);



module.exports = router;
