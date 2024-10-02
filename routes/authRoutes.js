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

router.post('/login', authController.logs);

router.get('/home', (req, res) => {
    res.render('user/home');
})
// You can add more routes here for authentication logic, etc.

router.get('/blala', (req, res) => {
    const userToken = req.session.userToken; // Access token from session
    res.render('user/blala', { token: userToken }); // Pass token to the view
});

module.exports = router;
