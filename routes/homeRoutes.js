const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Keep this for login functionality
const homeController = require('../controllers/homeController'); // Use this for home page

// Route to display the home page
router.get('/home', (req, res) => {
    res.render('user/home'); // Render the home page
});

// Route to display the cart page
router.get('/cart', (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Ensure you're retrieving the token correctly
    console.log('User Token in Home Routes:', userToken); // Log here to debug

    res.render('user/cart', { token: userToken }); // Pass the token to the view
});



// Login route
router.post('/login', authController.logs); // Ensure you are using authController for login

// Route to render the main home page
router.get('/', homeController.renderHomePage); // This should be the main route for home

module.exports = router;
