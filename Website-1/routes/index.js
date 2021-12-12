const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Home Page
router.get('/home', forwardAuthenticated, (req, res) => res.render('home'));

//Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => 
    res.render('dashboard', {
        name: req.user.name
    }));

module.exports = router;