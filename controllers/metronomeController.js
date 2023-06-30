const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');

const metronomeController = {
	getMetro: function (req,res) {
		req.session.referral = '/metronome';
		var username = req.session.username;
		res.render('metronome', {username});
	}
}

module.exports = metronomeController;