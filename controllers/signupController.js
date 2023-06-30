const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const initID = 1000;

const signupController = {
    getSignUp: function (req, res) {
        req.session.referral = '/signup';

        console.log(req.session.referral);

        res.render('signup');
    },

    postSignUp: function (req, res) {
        var email = req.body.email;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var password = req.body.password;
        var phone = req.body.phone;

        function insert(userID, result) {
            userID = result.length + initID;
            console.log(userID);
            var user = {
                userID: userID,
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                numPosts: 0,
                followers: [],
                avatar: '../images/default.png'
            }

            db.insertOne(User, user, function(result) {
                if (result) {
                    res.render('signup_success', {username: username});
                }
            });
        }

        bcrypt.hash(password, saltRounds, function (err, hash) {
            password = hash;
            var userID = 1000;
            db.findMany(User, {}, 'userID', function(result) {
                insert(userID, result);
            });
        });
    },

    getCheckUsername: function (req, res) {
        var username = req.query.username;
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    },

    getCheckPassword: function (req, res) {
        var password = req.query.password;
        db.findOne(User, {password: password}, 'password', function (result) {
            res.send(result);
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
