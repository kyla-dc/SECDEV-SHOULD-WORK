const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const initID = 1000;
var isValidEmail = false;
var isValidPassword = false;
var isValidPhone = false;
var isUniqueUsername = false;

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

        var regexEmail = /^(([a-zA-Z0-9])+(-|.|_)?([a-zA-Z0-9])+)+@([a-zA-Z0-9]|_)+(.\w{2})+$/;
        var regexPass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!+"\/,_:#$%^&*()_\-=\[\]\{\};':"\\\|<>?])[a-zA-Z0-9@!+"\/,_:#$%^&*()_\-=\[\]\{\};':"\\\|<>?]{8,}/;
        var regexPhone = /\d{10}$/

        /* checks if email format is valid */
        if(!email.value.match(regexEmail)){
            document.getElementById("invalid_email").style.display = "flex";
        }
        else {
            document.getElementById("invalid_email").style.display = "none";
            isValidEmail = true;
        }

        /* checks if password strength is valid */
        if(!password.value.match(regexPass)){
            document.getElementById("invalid_password").style.display = "flex";
        }
        else{
            document.getElementById("invalid_password").style.display = "none";
            isValidPassword = true;
        }

        /* checks if phone num format valid */
        if(!password.value.match(regexPhone)){
            document.getElementById("invalid_phone").style.display = "flex";
        }
        else{
            document.getElementById("invalid_phone").style.display = "none";
            isValidPhone = true;
        }


        /* checks if username is unique */
        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);

            if(result == null) {
                document.getElementById("same_username").style.display = "flex";
            }
            else {
                document.getElementById("same_username").style.display = "none";
                isUniqueUsername = true;
            }
        });

        if(isValidEmail && isValidPassword && isUniqueUsername && isValidPhone){
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
        }
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
