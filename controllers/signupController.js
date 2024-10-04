// controllers/signupController.js
const signupModel = require('../models/signupModel');

exports.registerUser = (req, res) => {
    const { firstname, lastname, birthdate, contact, state, city, zip, email, register_password } = req.body;

    // Concatenate first name and last name to form full name
    const fullName = `${firstname} ${lastname}`;

    // Create a new user object
    const newUser = {
        name: fullName, // Use the full name here
        birthdate,
        contact,
        state,
        city,
        zip,
        email,
        password: register_password // Include password here
    };

    // Insert the user into the database
    signupModel.createUser(newUser, (err, result) => {
        if (err) {
            console.error('Error registering user:', err); // Log the error for debugging
            return res.status(500).send('Error registering user');
        }

        // On successful registration, render success message or redirect
        res.redirect('/login');
    });
};
