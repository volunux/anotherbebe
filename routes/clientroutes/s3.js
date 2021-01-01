var express = require('express') , router = express.Router() , FroalaEditor = require('../../../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');


router.get('/posts-photos', function (req, res) {
  
  var configs = {
    // The name of your bucket.
    'bucket' : 'aremi-posts-photo',

    // S3 region. If you are using the default us-east-1, it this can be ignored.
    'region' : 'eu-central-1',

    // The folder where to upload the images.
    // 'keyStart' : 'uploads',

    // File access.
    'acl' : 'public-read-write',

    // AWS keys.
    'accessKeyId' : 'AKIAIDBRNJCTTC64MODA',

    'secretAccessKey' : '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'
  }

  var s3Hash = FroalaEditor.S3.getHash(configs);

  res.send(configs);

});

module.exports = router;