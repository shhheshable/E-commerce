const db = require('../config/db');

exports.loginAcc = ({ EmailAdd, Pass }, callback) => {
    // First query the email to see if it exists in the database
    const emailQuery = 'SELECT email, password, token, role FROM tblaccounts WHERE email = ?'; // Include role in the query

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
            // If the password matches, log true and return the token
            console.log('true');  // Password matches

            // Check the role
            if (user.role === 'admin') {
                // If the user is an admin, log that and return the admin role
                console.log('User is an admin');
                return callback(null, { success: true, message: 'Login successful (Admin)', role: 'admin', token: user.token });
            } else if (user.role === 'user') {
                // If the user is a regular user, log that and return the user role
                console.log('User is a regular user');
                return callback(null, { success: true, message: 'Login successful (User)', role: 'user', token: user.token });
            } else {
                // If the role is something else, handle it accordingly
                console.log('Unknown role');
                return callback(null, { success: true, message: 'Login successful (Unknown role)', role: user.role, token: user.token });
            }

        } else {
            // If the password doesn't match, log false
            console.log('false password'); // Password does not match
            return callback(null, { success: false, message: 'Wrong password.' });
        }
    });
};
