const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const logout = require('../controllers/logoutController');
const homeController = require('../controllers/homeController'); // Use this for home page

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

// Handle login
router.post('/login', authController.logs);

// Route to display home page and fetch products
router.get('/home', homeController.renderHomePage); // Ensure this calls the controller method

// Route for the admin dashboard
router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard');
});

// Handle logout
router.post('/logout', logout.logout); // Handle logout

module.exports = router;
