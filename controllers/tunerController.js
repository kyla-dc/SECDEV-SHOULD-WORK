const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');

const tunerController = {
	getTuner: function (req,res) {
		var username = req.session.username;

		req.session.referral = '/tuner';
		
		res.render('tuner', {username});
	}
}

module.exports = tunerController;