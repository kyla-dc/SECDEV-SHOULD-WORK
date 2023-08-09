const db = require('../models/mysqldb.js');
const Users = require('../models/UserModel.js');

const adminController = {
    getAdminPage: function (req, res) {
        var username = req.session.username;
        projection = 'userID username'
        var query = 'SELECT * from `user` WHERE username = "' + username + '";';
        
        db.query(query).then((result) => {
            if (result[0].userID == 1001) {
                var details = {
                    adminmsg: "Hello Admin"
                };
                res.render('adminpanel', details);
            }
            else {
                var details = {
                    error: "You do not have access to this page."
                };
                res.render('error', details);
            }
        });
    },

    getUserList: function (req, res){
        //double check if this person is really the admin 
        //call to get 
    },

    getLogRecords: function (req, res){

        var username = req.session.username;
        projection = 'userID username'
        var query = 'SELECT * from `user` WHERE username = "' + username + '";';
        
        // db.query(query).then((result) => {
        // //     if (result[0].userID != 1001) {
        // //         var details = {
        // //             error: "You do not have access to this page."
        // //         };
        // //         res.render('error', details);
        // //     }
        // console.log("In here ---- ", result); 
        // });

        

        query = 'SELECT * from `log`;';
        db.query(query).then((result) =>{
            if(result != ""){
                res.render('logrecord', result);
            }
            else {
                var details = {
                    error: "Seems like your log is empty."
                };
                res.render('error', details);
            }
        })
            
        }
    }

module.exports = adminController;