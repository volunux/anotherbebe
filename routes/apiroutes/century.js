var express = require('express'),			router = express.Router(),		century = require('../controllers/century');


router.get('/century/'													,		century.centuryList);

router.post('/century/'													,		century.centuryAdd);



module.exports = router;