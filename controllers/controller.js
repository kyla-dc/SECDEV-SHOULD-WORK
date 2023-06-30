const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getIndex: function (req, res) {
        res.render('index');
    },

    getSession: function (req, res) {
    	if (req.session.username) {
            req.session.referral = '/profile/'+req.session.username;
    		res.redirect('/profile/'+req.session.username);
    		console.log('session found user: '+req.session.username);
    	}
    	else {
            req.session.referral = '/login';
    		res.render('login');
    	}
    },

    getBack: function (req, res) {
        res.redirect(req.session.referral);
    }
}

module.exports = controller;