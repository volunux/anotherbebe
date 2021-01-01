// var mongodb = require('mongodb').MongoClient;

// const assert = require('assert');

// const url = 'mongodb://localhost/27017';

// const dbName = 'tutorial';

// const client = new mongodb(url);

// client.connect((err) => {

// 		assert.equal(null , err);

// 		console.log('Connected to the database successfully.');

// 		const db = client.db(dbName);

// 		client.close();
// })


var pathU = '/photo/a';

var pathS = pathU.split('/');

var pathM = pathS.map((url , index) => {

	console.log(url);

	console.log(index);

		if (url == '') {

				return {

				'url' : '/' ,

				'label' : 'Home'

				}
		}

		return {

				'url' : url ,

				'label' : url[0].toUpperCase() + url.slice(1).toLowerCase()
		}

});

var pathD = '/photo/a/the-legends-of-ife';

var pathSS = pathD.split('/').pop();
