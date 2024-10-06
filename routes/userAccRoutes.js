// adminAccRoutes.js
const express = require('express');
const router = express.Router();
const userAccController = require('../controllers/userAccController');


// Route to get admin account information
// Route to display the home page
// Route to display the cart page
router.get('/home', (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Ensure you're retrieving the token correctly
    console.log('User Token in Home Routes:', userToken); // Log here to debug

    res.render('user/home', { token: userToken }); // Pass the token to the view
});


// Route to display the cart page
router.get('/cart', (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Ensure you're retrieving the token correctly
    console.log('User Token in Home Routes:', userToken); // Log here to debug

    res.render('user/cart', { token: userToken }); // Pass the token to the view
});

// Route to display the cart page
router.get('/accInfo', (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Ensure you're retrieving the token correctly
    console.log('User Token in Home Routes:', userToken); // Log here to debug

    res.render('user/accInfo', { token: userToken }); // Pass the token to the view
});




module.exports = router;
