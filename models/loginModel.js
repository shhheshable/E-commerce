const db = require('../config/db');

exports.loginAcc = ({ EmailAdd, Pass }, callback) => {
    // First query the email to see if it exists in the database
    const emailQuery = 'SELECT email, password FROM tblaccounts WHERE email = ?';

    // Execute the query to check if the email exists
    db.query(emailQuery, [EmailAdd], (err, results) => {
        if (err) {
            return callback(err, null);  // Pass error to the callback if there is a database error
        }

        if (results.length === 0) {
            // If no user is found with that email, return false (email doesn't exist)
            console.log('false'); // Email does not exist
            return callback(null, { success: false, message: 'Invalid email.' });
        }

        const user = results[0];  // Extract the user information from the results

        // Compare the provided password with the stored password
        if (user.password === Pass) {
            // If the password matches, log true
            console.log('true');  // Password matches
            return callback(null, { success: true, message: 'Login successful' });
        } else {
            // If the password doesn't match, log false
            console.log('false password'); // Password does not match
            return callback(null, { success: false, message: 'Wrong password.' });
        }
    });
};
