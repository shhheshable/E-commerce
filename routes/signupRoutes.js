const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController')

//display the signup form

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

// Route for the root URL
router.get('/', (req, res) => {
    res.redirect('/signup'); // Redirect to the login page
});

router.post('/signup', signupController.createAcc);

// You can add more routes here for authentication logic, etc.

module.exports = router;