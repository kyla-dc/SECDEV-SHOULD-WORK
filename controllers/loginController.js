const db = require('../models/db.js');
const Users = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
var attempts = 5;

const loginController = {
    getLogin: function (req, res) {
        req.session.referral = '/login';
        
		res.render('login');
	},

    getPassword: function (req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = {
            username: username,
        }

        var projection = 'username password';

        db.findOne(Users, user, projection, function (result) {
            if (result != null) {
                bcrypt.compare(password, result.password, function (err, equal) {
                    if (equal) {
                        res.send(true);
                    }
                    else {
                        res.send(false);
                    }
                });
            }
            else {
                res.send(false);
            }
        });
    },

	postLogin: function (req, res) {
        
        var username = req.body.username;
        var password = req.body.password;
        var user = {
        	username: username
        }

        var projection = 'userID username password';

        db.findOne(Users, user, projection, function(result) {  
            console.log(result);
            if (result == null) {
                attempts = attempts - 1;
                if (attempts == 0) {
                    var error = {error: 'You have reached the maximum number of login attempts. Please try again later.'}
                    res.render('error', error);

                    // disables submit button for 15 minutes
                    document.getElementById("submit").disabled=true;
                    setTimeout(function(){  
                        document.getElementById("submit").disabled=false;
                    }, 15 * 60 * 1000);

                    attempts = 3; // refresh attempts after lockout
                }

                else {
                    var error = {error: 'You have entered an invalid username or password'}
                    res.render('error', error);
                }
            }
        	else if (result.username == username && result != null) {
        		bcrypt.compare(password, result.password, function (err, equal) {
            		if (equal) {
                        req.session.username = user.username;
                        req.session.userID = result.userID;
                        
                        console.log("Session: "+req.session.username);
        				res.redirect('/profile/'+user.username);
        			}
                    else {
                        attempts = attempts - 1;
                        if (attempts == 0) {
                            var error = {error: 'You have reached the maximum number of login attempts. Please try again later.'}
                            res.render('error', error);

                            // disables submit button for 15 minutes
                            document.getElementById("submit").disabled=true;
                            setTimeout(function(){  
                                document.getElementById("submit").disabled=false;
                            }, 15 * 60 * 1000);

                            attempts = 3; // refresh attempts after lockout
                        }

                        else {
                            var error = {error: 'You have entered an invalid username or password'}
                            res.render('error', error);
                        }
                        
                    }
        		});
            }
        });
	}
}

module.exports = loginController;