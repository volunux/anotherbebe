module.exports = {

		'magic' : {
									'pdf' : '25504446' ,
																	
		} ,

		'checkMagic' : (magic) => {
																var fMagic = module.exports.magic;
																																		if (magic == fMagic.pdf || magic == fMagic.mp31) {	
																																																																																				
																																							return true;
																																		} else {
																																							return false;

																																		}

		}

}