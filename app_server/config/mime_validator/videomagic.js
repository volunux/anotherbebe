module.exports = {

		'magic' : {
									'mkv' : '1a45dfa393428288' ,
											
										'mkv1' : '000001b3' ,

											'mkv2' : '1a45dfa3' ,
										
											'mp4' : '00000018' ,																						
		} ,

		'checkMagic' : (magic) => {
																var fMagic = module.exports.magic;
																																		if (magic == fMagic.mkv || magic == fMagic.mkv1 || magic == fMagic.mkv2 || magic == fMagic.mp4 || magic == fMagic.png1) {	
																																																																																				
																																							return true;
																																		} else {
																																							return false;

																																		}

		}

}

console.log('A' == 'a');