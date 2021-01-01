module.exports = {

		'magic' : {
									'mp3' : 'fffb' ,
																		'mp31' : '494433' 
		} ,

		'checkMagic' : (magic) => {
																var fMagic = module.exports.magic;
																																		if (magic == fMagic.mp3 || magic == fMagic.mp31) {	
																																																																																				
																																							return true;
																																		} else {
																																							return false;

																																		}

		}

}