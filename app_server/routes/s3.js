var express = require('express') , router = express.Router() , FroalaEditor = require('../../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js') , uuidv4 = require('uuid/v4');

router.get('/signature' , (req, res) => {
  
  var configs = {

    'bucket' : process.env.posts_bucket ,

    'region' : process.env.posts_region ,

    'keyStart' : '' ,

    'acl' : 'public-read-write' ,

				'secretKey': process.env.aremiuser_secretkey ,

				'accessKey': process.env.aremiuser_accesskey ,
  }

  var s3Hash = FroalaEditor.S3.getHash(configs);

  res.json(s3Hash);

});

module.exports = router;