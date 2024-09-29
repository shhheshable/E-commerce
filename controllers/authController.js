const path = require('path');
const login = require('../models/loginModel');

const logs = (req, res) => {
    const EmailAdd = req.body.email;
    const Pass = req.body.password;

    login.loginAcc({ EmailAdd, Pass }, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error'); // Log and respond with an error
        }

        // Check the result for success or failure
        if (result.success) {
            // If the login is successful, redirect to the home page
            return res.redirect('/home');
        } else {
            // If the login fails (either invalid email or wrong password), redirect to login
            console.log(result.message); // Log the failure message
            return res.redirect('/login'); // Redirect to login page
        }
    });
};

module.exports = { logs };
