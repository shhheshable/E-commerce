const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route to display the login page
router.get('/home', (req, res) => {
    res.render('user/home'); // Path to the EJS file
});

module.exports = router;
