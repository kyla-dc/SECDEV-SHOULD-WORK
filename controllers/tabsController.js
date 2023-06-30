const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const Posts = require('../models/PostModel.js');
const Comments = require('../models/CommentModel.js');
const Tabs = require('../models/TabsModel.js');

const tabsController = {
	getTabs: function (req,res) {
		var username = req.session.username;

		req.session.referral = '/tabs';

		res.render('tabs', {username});
	},

	getTabsURL: function (req, res) {
		var URL = req.params.URL
		var username = req.session.username;

		req.session.referral = '/tabs/'+URL;

		res.render(URL, {username});
	},

	getTabsFeed: function (req, res) {
		var username = req.session.username;

		var projection =  'tabsID tabsName tabsInstrument URL';

		db.findMany(Tabs, {}, projection, function (results) {
			if (results != null) {
				console.log(results);
				res.send(results);
			}
		});
	}
}

module.exports = tabsController;