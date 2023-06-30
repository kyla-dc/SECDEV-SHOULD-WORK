const { check } = require('express-validator');

const validation = {

    registerValidation: function(){

        var validation = [
            //check if username form is filled.
            check('username', 'Username is required').notEmpty(),
            //check if password is atleast 4 characters.
            check('password', 'Password must contain atleast 4 characters').isLength({min : 4}),
            //check if firstName is filled. 
            check('firstName', 'First name is required').notEmpty(),
            //check if lastName is filled.
            check('lastName', 'Last name is required').notEmpty()  
        ];

        return validation;
    }

}

module.exports = validation;