const path = require('path');
const login = require('../models/loginModel');
const home = require('../models/homeModel');
const admin = require('../models/adminModel');

const logs = (req, res) => {
    const EmailAdd = req.body.email;
    const Pass = req.body.password;

    login.loginAcc({ EmailAdd, Pass }, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error'); // Log and respond with an error
        }

        // Check the result for success or failure
        if (result.success) {
            // Store the token in the session
            req.session.userToken = result.token;
            req.session.userRole = result.role; // Store the role in the session
            

            // Redirect based on the user role
            if (result.role === 'admin') {
                // If the user is an admin, redirect to admin dashboard
                return res.redirect(`/dashboard?${result.token}`);
            } else if (result.role === 'user') {
                // If the user is a regular user, redirect to the home page
                return res.redirect(`/home?${result.token}`);
            } else {
                // If the role is unknown, handle accordingly
                console.log('Unknown role, redirecting to home.');
                return res.redirect(`/home?${result.token}`);
            }
        } else {
            // If the login fails (either invalid email or wrong password), redirect to login
            console.log(result.message); // Log the failure message
            return res.redirect('/login'); // Redirect to login page
        }
    });
};

module.exports = { logs };
