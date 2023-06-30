const db = require ('./models/db.js');
const Comment = require ('./models/CommentModel.js');

db.connect();

var comment = {
	commentID: '1000100411',
	commenterID: 1000,
	commentNum: 1,
	postID: '10041',
	username: 'migsbb',
	content: 'lol'
};

db.insertOne(Comment, comment, function(result) {
	if (result != false) {
		console.log("Added" + comment.username);
	}
});

var comment = {
	commentID: '1002100311',
	commenterID: 1002,
	commentNum: 1,
	postID: '10031',
	username: 'iceice',
	content: 'hey thats pretty nice'
};

db.insertOne(Comment, comment, function(result) {
	if (result != false) {
		console.log("Added" + comment.username);
	}
});

var comment = {
	commentID: '1005100411',
	commenterID: 1005,
	commentNum: 1,
	postID: '10041',
	username: 'dmitrilover',
	content: 'Looks like Dmitri'
};

db.insertOne(Comment, comment, function(result) {
	if (result != false) {
		console.log("Added" + comment.username);
	}
});

var comment = {
	commentID: '1005100412',
	commenterID: 1005,
	commentNum: 2,
	postID: '10041',
	username: 'dmitrilover',
	content: 'Wait no'
};

db.insertOne(Comment, comment, function(result) {
	if (result != false) {
		console.log("Added" + comment.username);
	}
});

var comment = {
	commentID: '1005100413',
	commenterID: 1005,
	commentNum: 3,
	postID: '10041',
	username: 'dmitrilover',
	content: 'But maybe'
};

db.insertOne(Comment, comment, function(result) {
	if (result != false) {
		console.log("Added" + comment.username);
	}
});
