module.exports = {

	'names' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'List of Names' });
	} , 

	'nameEthnic' : (req , res , next) => {
																										res.render('name/index' , {'title' : 'List of Ethnic Names ordered by Alphabet'})
	} ,

	'nameByAlphabet' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Name Under Alphabet' });
	} , 

	'nameGender' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Name Under Gender' });
	} , 

	'nameDetail' : (req , res , next) => {
																									  res.render('name/name_detail' , { 'title': 'Name Details' });
	} , 

	'nameAdd' : (req , res , next) => {
																									  res.render('forms/add_forms/name_add' , { 'title': 'Add a new Name' });
	} , 

	'nameAddSubmit' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Add a new Name' });
	} , 

	'nameUpdate' : (req , res , next) => {
																									  res.render('forms/add_forms/name_add' , { 'title': 'Update a Name' , 'name' : {
																									  																																								'name' : 'Yusuf' ,
																									  																																																		'definition' : 'The Most Pious Among Human'
																									  }});
	} , 

	'nameUpdateSubmit' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Update a Name' });
	} , 

	'nameDelete' : (req , res , next) => {
																									  res.render('forms/add_forms/name_delete' , { 'title': 'Remove a Name' });
	} , 

	'nameDeleteSubmit' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Remove a Name' });
	} , 

	'nameVote' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Vote a Name' });
	} , 
}