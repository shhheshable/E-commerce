const express = require('express');
const router = express.Router();
const signupController = ('../controllers/signupController')

//display the signup form

router.get('/signup', (req, res) => {
    res.render('user/signup');
});

// Route for the root URL
router.get('/', (req, res) => {
    res.redirect('/signup'); // Redirect to the login page
});

// You can add more routes here for authentication logic, etc.

module.exports = router;