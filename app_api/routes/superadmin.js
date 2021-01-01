var express = require('express') , router = express.Router() , yadmin = require('../controllers/superadmin');

router.get('/yadmin/'													,														yadmin.profile);

router.get('/yadmin/user/'										,														yadmin.listUser);

router.get('/yadmin/user/:user'								,														yadmin.profileUser);


router.get('/yadmin/add'											,														yadmin.add);

router.post('/yadmin'													,														yadmin.addSubmit);


router.get('/yadmin/update'										,														yadmin.update);

router.put('/yadmin/'													,														yadmin.updateSubmit);


router.put('/yadmin/user/:user'								,														yadmin.userUpdate);

router.delete('/yadmin/user/:user'						,														yadmin.userDelete)


module.exports = router;
