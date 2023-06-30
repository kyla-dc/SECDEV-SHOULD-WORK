const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const path = require('path');
const util = require('util');
const clone = require('clone');

const postController = {
	getFeed: function (req,res) {
		var sessionname = req.session.username;
		var feedname = req.params.username;

		details = {
			sessionname: sessionname,
			feedname: feedname
		}

		req.session.referral = '/feed';

		res.render('feed', details);
	},

	getViewUserPosts: function (req, res) {
		var sessionname = req.session.username;
		var feedname = req.params.username;

		details = {
			sessionname: sessionname,
			feedname: feedname
		}

		req.session.referral = '/viewposts/'+feedname;

		res.render('viewposts', details);
	},

	getNormalPosts: function (req, res) {
		var projection = 'postID posterID userPostNum username type contentPath description likes tags'

		db.findMany(Posts, {}, projection, function (results) {
			res.send(results);
		});
	},

	uploadPost: async function (req, res) {
        try {
        	const username = req.body.hiddenUsername;
        	const type = req.body.content_type;
            const file = req.files.file;
            const fileName = file.name;
            const size = file.data.length;
            const extension = path.extname(fileName);
            const toBeDeleted = req.body.avatarPath;
            var postID = req.body.postID;
            var allowedExtensions;
            var URL;

            if (type == 'image')
            	allowedExtensions = /png|jpeg|jpg/;
            if (type == 'video')
            	allowedExtensions = /mp4|ogg|webm/;
            if (type == 'audio')
            	allowedExtensions = /mp3|wav|ogg/;

            console.log('Allowed Extensions: '+allowedExtensions);

            if (!allowedExtensions.test(extension)) throw "Unsupported extension";
            if (size > 12000000) throw "File must be less than 12MB";

            const md5 = file.md5;

            if (type == 'image')
            	URL = "/images/posts/"+postID+extension;
			if (type == 'video')
            	URL = "/videos/posts/"+postID+extension;
			if (type == 'audio')
            	URL = "/audio/posts/"+postID+extension;

            var contentPath = ".."+URL;

            await util.promisify(file.mv)("./dist"+URL);

            // Submit Post

            var posterID = req.body.userID;
            var userPostNum = req.body.postNum;
            userPostNum++;
            var description = req.body.description_area;

            var tags = req.body.tags;
			var tagsArray = tags.split(" ");

            var post = {
				postID: postID,
				posterID: posterID,
				userPostNum: userPostNum,
				username: username,
				type: type,
				contentPath: contentPath,
				description: description,
				likes: [],
				tags: tagsArray
			}

			console.log('postID: '+postID);
			console.log('posterID: '+posterID);
			console.log('userPostNum: '+userPostNum);
			console.log('username: '+username);
			console.log('type: '+type);
			console.log('contentPath: '+contentPath);
			console.log('description: '+description);
			console.log('tags: '+tagsArray);

			db.insertOne(Posts, post, function (result) {
				if (result) {
					console.log('Post successfully added: '+result);

					var oldPostNum = clone(userPostNum);
					oldPostNum--;

					var oldUser = {
						username: username,
						numPosts: oldPostNum
					}

					var newUser = {
						username: username,
						numPosts: userPostNum
					}
					db.updateOne(Users, oldUser, newUser, function (result) {
						if (result) {
							console.log('Profile Updated');
							res.redirect('/comment/'+post.postID);
						}	
					});
				}
			});

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: err
            });
        }
    },

	getUserPosts: function (req, res) {
		var query = {
			username: req.query.feedname
		}
		var projection = 'postID posterID userPostNum username type contentPath description likes tags'

		db.findMany(Posts, query, projection, function (results) {
			res.send(results);
		});
	},

	getMakePostPage: function (req, res) {
		var sessionname = req.session.username;
		var feedname = req.params.username;

		var query = {
			username: sessionname
		}

		var projection = 'userID numPosts';

		db.findOne(Users, query, projection, function (result) {
			if (result != null) {

				details = {
					userID: result.userID,
					sessionname: sessionname,
					feedname: feedname,
					numPosts: result.numPosts
				}

				req.session.referral = '/makePost';

				res.render('makePost', details);
			}
		});
	},

	postLike: function (req, res) {
		var sessionuser = req.session.username;
		var postID = req.params.postID;

		var query = {
			username: sessionuser
		}

		var projection = 'userID';

		db.findOne(Users, query, projection, function (UserResult) {
			if (UserResult != null) {
				var userID = UserResult.userID;
				console.log('By User: ' + userID);

				query = {
					postID: postID
				}

				projection = 'postID likes';

				db.findOne(Posts, query, projection, function (PostResult) {
					var oldLikes = PostResult.likes;
					var newLikes = clone(oldLikes);

					var filter = {
						postID: PostResult.postID,
						likes: PostResult.likes
					}

					if (PostResult != null) {
						if (oldLikes.includes(userID)) {
							console.log('Already Liked by User');
							res.send(false);
						}
						else {
							newLikes.push(userID);

							var newInfo = {
								postID: postID,
								likes: newLikes
							}

							db.updateOne(Posts, filter, newInfo, function (result) {
								if (result) {
									console.log('Posted Like');
									res.send(true);
								}
							});
						}
					}
				});
			}
		});
	},

	deletePost: function (req, res) {
		var postID = req.params.postID;
		var query = {
			postID: postID
		}
		console.log(postID);

		db.deleteOne(Posts, query, function (result) {
			if (result) {
				db.deleteMany(Comments, query, function (result) {
					var query = {
						username: req.session.username
					}

					var projection = 'username numPosts';

					db.findOne(Users, query, projection, function (result) {
						if (result != null) {
							var oldPostNum = result.numPosts;
							var newPostNum = clone(oldPostNum);

							var oldInfo = {
								username: req.session.username,
								numPosts: oldPostNum
							}

							newPostNum--;

							var newInfo = {
								username: req.session.username,
								numPosts: newPostNum
							}

							db.updateOne(Users, oldInfo, newInfo, function (result) {
								if (result)
									res.send(true);
							});
						}
					});
				});
			}
		});
	}
}

module.exports  = postController;