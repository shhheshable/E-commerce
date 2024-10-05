// models/signupModel.js
const db = require('../config/db'); // Import the database connection
const crypto = require('crypto');

// Function to create a new user
exports.createUser = (userData, callback) => {
    // Merge state, city, and zip into the address
    const fullAddress = `${userData.state}, ${userData.city}, ${userData.zip}`;

    // Check if email already exists in tblaccounts
    const checkEmailSql = `
        SELECT * FROM tblaccounts WHERE email = ?
    `;

    db.query(checkEmailSql, [userData.email], (err, results) => {
        if (err) {
            return callback(err);
        }

        // If an account with the same email exists, return an error
        if (results.length > 0) {
            return callback(new Error('Email already exists'));
        }
        
        const token = crypto.randomBytes(32).toString('hex');

        // If email doesn't exist, insert user account into tblaccounts
        const sqlAccount = `
            INSERT INTO tblaccounts (email, password, token)
            VALUES (?, ?, ?)
        `;

        db.query(sqlAccount, [userData.email, userData.password, token], (err, accountResult) => {
            if (err) {
                return callback(err);
            }

            // Use the inserted account id for the user table (foreign key)
            const accountId = accountResult.insertId;

            // Insert user data into tbluser, including contact information
            const sqlUser = `
                INSERT INTO tbluser (acc_id, name, birthdate, address, contact)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                sqlUser,
                [accountId, userData.name, userData.birthdate, fullAddress, userData.contact],
                (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, result);
                }
            );
        });
    });
};
