const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logout = require('../controllers/logoutController');

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

router.post('/login', authController.logs);

router.get('/home', (req, res) => {
    res.render('user/home');
})
// You can add more routes here for authentication logic, etc.

router.post('/logout', logout.logout); // Handle logout


module.exports = router;


