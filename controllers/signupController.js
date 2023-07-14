const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const path = require('path');
const util = require('util');
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
        var bcrypt_result = null;

        function insert(avatarPath) {
            var userID = bcrypt_result.length + initID;
            console.log(userID);
            var user = {
                userID: userID,
                username: username,
                password: bcrypt_password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                numPosts: 0,
                followers: [],
                avatar: avatarPath, 
                isDeleted: false    
            }

            db.insertOne(User, user, function(result) {
                if (result) {
                    res.render('signup_success', {username: username});
                }
            });
        }

        async function uploadPicture() {
            try {
                const username = req.body.username;
                const file = req.files.file;
                const fileName = file.name;
                const size = file.data.length;
                const extension = path.extname(fileName);
    
                const allowedExtensions = /png|jpeg|jpg/;
    
                if (!allowedExtensions.test(extension)) throw "Unsupported extension";
                if (size > 12000000) throw "File must be less than 12MB";
    
                const md5 = file.md5;
    
                const URL = "/images/avatar/"+username+extension;
    
                avatarPath = ".."+URL;
    
                await util.promisify(file.mv)("./dist"+URL);

                bcrypt.hash(password, saltRounds, function (err, hash) {
                    bcrypt_password = hash;
                    db.findMany(User, {}, 'userID', function(result) {
                        console.log(result);
                        bcrypt_result = result;
                        insert(avatarPath);
                    });
                });                
    
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    message: err
                });
            }
        }

        uploadPicture()
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
