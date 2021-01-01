const Art = require('./article')('Art');

const Book = require('./book');

const Name = require('./name');

const Photo = require('./photo');

const Legend = require('./legend');

const Upload = require('./upload');

const ArtComment = require('./comment_model/comment')('Art');

const ArtReply = require('./comment_model/reply')('Art');

const ArtVote = require('./comment_model/vote')('Art');

const ArtCommentVote = require('./comment_model/vote_comment')('Art' , 'Art');

const ArtReplyVote = require('./comment_model/vote_reply')('Art' , 'Art');

const PhotoComment = require('./comment_model/comment')('Photo');

const PhotoReply = require('./comment_model/reply')('Photo');

const PhotoVote = require('./comment_model/vote')('Photo');

const PhotoCommentVote = require('./comment_model/vote_comment')('Photo' , 'Photo');

const PhotoReplyVote = require('./comment_model/vote_reply')('Photo' , 'Photo');

const LegendComment = require('./comment_model/comment')('Legend');

const LegendReply = require('./comment_model/reply')('Legend');

const LegendVote = require('./comment_model/vote')('Legend');

const LegendCommentVote = require('./comment_model/vote_comment')('Legend' , 'Legend');

const LegendReplyVote = require('./comment_model/vote_reply')('Legend' , 'Legend');

const Eyon = require('./eyon');

const Country = require('./country');

const Century = require('./century');

const Continent = require('./continent');

const Region = require('./region');

const Baby = require('./baby');

const Alphabet = require('./alphabet');

const Specie = require('./specie');

const Gender = require('./gender');

const Genre = require('./genre');

module.exports = {

	'Art' : Art ,

	'Photo' : Photo ,
	
	'Name' : Name ,

	'Book' : Book ,

	'Legend' : Legend ,

	'Upload' : Upload ,

	'ArtComment' : ArtComment ,

	'ArtReply' : ArtReply ,

	'ArtVote' : ArtVote ,

	'ArtCommentVote' : ArtCommentVote ,

	'ArtReplyVote' : ArtReplyVote ,

	'PhotoComment' : PhotoComment ,

	'PhotoReply' : PhotoReply ,

	'PhotoVote' : PhotoVote ,

	'PhotoCommentVote' : PhotoCommentVote ,

	'PhotoReplyVote' : PhotoReplyVote ,

	'PhotoVote' : PhotoVote ,

	'LegendComment' : LegendComment ,

	'LegendReply' : LegendReply ,

	'LegendVote' : LegendVote ,

	'LegendCommentVote' : LegendCommentVote ,

	'LegendReplyVote' : LegendReplyVote ,

	'LegendVote' : LegendVote ,

	'Eyon' : Eyon ,

	'Country' : Country ,

	'Century' : Century ,

	'Continent' : Continent ,

	'Region' : Region ,

	'Baby' : Baby ,

	'Alphabet' : Alphabet ,

	'Specie' : Specie ,

	'Gender' : Gender ,

	'Genre' : Genre

}