var express = require('express') , router = express.Router();

const photo = require('../../controllers/helpers/vote')('Photo' , 'photo');

const art = require('../../controllers/helpers/vote')('Art' , 'art');




router.get('/photo/:photo/vote'																														,											photo.entryVote);

router.get('/photo/:photo/comment/:comment/vote'																					,											photo.entryCommentVote);

router.get('/photo/:photo/comment/:comment/reply/:reply/vote'															,											photo.entryReplyVote);



router.get('/art/:article/vote'																														,											art.entryVoteArticle);

router.get('/art/:article/comment/:comment/vote'																					,											art.entryCommentVoteArticle);

router.get('/art/:article/comment/:comment/reply/:reply/vote'															,											art.entryReplyVoteArticle);



module.exports = router;