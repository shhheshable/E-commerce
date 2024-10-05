const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Keep this for login functionality
const homeController = require('../controllers/homeController'); // Use this for home page

// Route to display the login page
router.get('/home', (req, res) => {
    res.render('user/home'); // This route may not be needed if the homeController handles this
});

router.post('/login', authController.logs); // Ensure you are using authController for login

router.get('/blala', (req, res) => {
    const userToken = req.query.token || req.session.userToken;
    res.render('user/blala', { token: userToken }); // Pass token to the view
});

// Route to render the home page
router.get('/', homeController.renderHomePage); // This should be the main route for home

module.exports = router;
