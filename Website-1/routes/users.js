const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

//MongoDb User Model
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');

//Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

//Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register Handler
router.post('/register', (req,res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2){
        errors.push({ msg: '❌ Please enter all the required fields' });    
    } else {
        // Check Passwords match
        if (password !== password2){
            errors.push({ msg: '❌ Passwords do not match' });
        }

        //check password length
        if(password.length < 6){
            errors.push({ msg: '❌ Password must be at least 6 characters' });
        }
    }
    if(errors.length > 0){
        res.render('register', { 
            errors: errors,
            name: name, 
            email: email, 
            password: password,  
            password2: password2
        });
    } else {
        //Validate Pass
        User.findOne({ email: email })
        .then((user) => {
            if(user){
                //User Exists
                errors.push({ msg: '❌ Email is already registered' });
                res.render('register', { 
                    errors: errors,
                    name: name, 
                    email: email, 
                    password: password,  
                    password2: password2
                });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
                //Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) return err;

                        // Set password to hash
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', `✔️ You're now registered successfully and can Login ❕`)
                                res.redirect('/users/login');
                            })
                            .catch((err) => {console.log(err)});
                    })
                );
            }
        });
    }

});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', `✔️ You're now Logged out successfully ❕`);
    res.redirect('/users/login');
}) 

module.exports = router;