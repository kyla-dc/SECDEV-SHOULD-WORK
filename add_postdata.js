const db = require ('./models/db.js');
const Post = require ('./models/PostModel.js');

db.connect();

var post = {
	postID: '10001',
	posterID: 1000,
	userPostNum: 1,
	username: 'migsbb',
	type: 'image',
	contentPath: '../images/posts/10001.jpg',
	description: 'test',
	likes: [],
	tags: ['#test']
};

db.insertOne(Post, post, function(result) {
	if (result != false) {
		console.log("Added Post" + post.postID);
	}
});

var post = {
	postID: '10002',
	posterID: 1000,
	userPostNum: 2,
	username: 'migsbb',
	type: 'image',
	contentPath: '../images/posts/10002.jpg',
	description: 'longer test',
	likes: [],
	tags: ['#test']
};

db.insertOne(Post, post, function(result) {
	if (result != false) {
		console.log("Added Post" + post.postID);
	}
});

var post = {
	postID: '10021',
	posterID: 1002,
	userPostNum: 1,
	username: 'iceice',
	type: 'audio',
	contentPath: '../audio/posts/10021.mp3',
	description: 'much longer test',
	likes: [],
	tags: ['#test']
};

db.insertOne(Post, post, function(result) {
	if (result != false) {
		console.log("Added Post" + post.postID);
	}
});

var post = {
	postID: '10031',
	posterID: 1003,
	userPostNum: 1,
	username: 'heyimia',
	type: 'video',
	contentPath: '../videos/posts/10031.mp4',
	description: 'much longer test',
	likes: [],
	tags: ['#test2']
};

db.insertOne(Post, post, function(result) {
	if (result != false) {
		console.log("Added Post" + post.postID);
	}
});

var post = {
	postID: '10041',
	posterID: 1004,
	userPostNum: 1,
	username: 'notgohan',
	type: 'video',
	contentPath: '../videos/posts/10041.mp4',
	description: 'much longerest test description for testing purposes',
	likes: [],
	tags: ['#test2']
};

db.insertOne(Post, post, function(result) {
	if (result != false) {
		console.log("Added Post" + post.postID);
	}
});