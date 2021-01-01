module.exports = {

	'entryPublisher' : (req , res , next) => {
																							req.body.author = req.user._id;
																																							next();		
		}
}