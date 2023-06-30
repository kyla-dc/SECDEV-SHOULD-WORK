const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');

const commentController = {
	// Gets the Commenting page
	getComment: function (req, res) {
		var postID = req.params.postID;
		var sessionname = req.session.username;

		req.session.referral = '/comment/'+postID;

		details = {
			postID: postID,
			sessionname: sessionname
		}

		res.render('comment', details);
	},

	getPost: function (req, res) {
		var query = {
			postID: req.query.postID
		}

		var projection = 'postID posterID userPostNum username type contentPath description likes tags';

		db.findOne(Posts, query, projection, function (result) {
			if (result != null) {
				res.send(result);
			} 
		});
	},

	getPostComments: function (req, res) {
		var query = {
			postID: req.query.postID
		}

		var projection = 'commentID commenterID commentNum postID username content';

		db.findMany(Comments, query, projection, function (results) {
			if (results != null) {
				res.send(results);
			}
		})
	},

	postComment: function (req, res) {
		var postID = req.body.formPostID;

		var query = {
			username: req.session.username
		}

		var projection = 'userID username';

		db.findOne(Users, query, projection, function (result) {
			if (result != null) {
				console.log('User found: ' + result.username);
				console.log('Commenter ID: ' + result.userID);
				console.log('Post ID: ' + postID);

				var commenterID = result.userID;
				var commentsNum = req.body.commentsNum;
				commentsNum++;
				console.log(commentsNum);
				var commentID = commenterID+postID+commentsNum;

				var comment = {
					commentID: commentID,
					commenterID: commenterID,
					commentNum: commentsNum,
					postID: postID,
					username: req.session.username,
					content: req.body.commentAreaContent
				}

				db.insertOne(Comments, comment, function (result) {
					if (result != null) {
						console.log('Added Comment: '+commentID);
						res.redirect('/back');
					}
				});
			}
		});
	},

	deleteComment: function (req, res) {
		var postID = req.params.postID;
		var username = req.session.username;
		var commentID = req.params.commentID;

		var query = {
			commentID: commentID,
			postID: postID,
			username: username
		}

		db.deleteOne(Comments, query, function (result) {
			if (result)
				res.send(true);
		});
	}
}

module.exports = commentController;