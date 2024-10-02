// routes/signupRoutes.js
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController'); // Ensure this path is correct

// Define the route for registration
router.post('/Register', signupController.registerUser); // Make sure registerUser is correctly defined in your controller

router.get('/', (req, res) => {
    res.render('user/signup'); // Make sure this matches your EJS file location
});

router.get('/login', (req, res) => {
    res.render('user/login');
});

module.exports = router;
