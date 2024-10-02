const express = require('express');
const router = express.Router();
const homeController = require('../controllers/authController');

// Route to display the login page
router.get('/home', (req, res) => {
    res.render('user/home'); // Path to the EJS file
});

router.post('/login', homeController.logs);

router.get('/blala', (req, res) => {
    const userToken = req.session.userToken; // Access token from session
    res.render('user/blala', { token: userToken }); // Pass token to the view
});

module.exports = router;
