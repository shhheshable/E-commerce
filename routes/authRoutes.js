const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to display the login page
router.get('/login', (req, res) => {
    res.render('user/login'); // Path to the EJS file
});

// Route for the root URL
router.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to the login page
});

// Route for Signup Page
router.get('/signup', (req, res) => {
    res.render('user/signup');
});

// You can add more routes here for authentication logic, etc.

module.exports = router;
