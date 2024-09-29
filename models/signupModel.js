// models/signupModel.js
const db = require('../config/db'); // Import the database connection

// Function to create a new user
exports.createUser = (userData, callback) => {
    // Merge state, city, and zip into the address
    const fullAddress = `${userData.state}, ${userData.city}, ${userData.zip}`;

    // Insert user account into tblaccounts first
    const sqlAccount = `
        INSERT INTO tblaccounts (email, password)
        VALUES (?, ?)
    `;

    // Insert user data into tbluser, including contact information
    const sqlUser = `
        INSERT INTO tbluser (acc_id, name, birthdate, profile, address, contact)
        VALUES (?, ?, ?, NULL, ?, ?)
    `;

    // Start with the account insertion
    db.query(sqlAccount, [userData.email, userData.password], (err, accountResult) => {
        if (err) {
            return callback(err);
        }

        // Use the inserted account id for the user table (foreign key)
        const accountId = accountResult.insertId;

        // Now insert the user information in tbluser using the account id
        db.query(
            sqlUser,
            [accountId, userData.name, userData.birthdate, fullAddress, userData.contact],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null, result); // Success
            }
        );
    });
};
