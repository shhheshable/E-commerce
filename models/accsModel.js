const db = require('../config/db'); // Make sure to require your database configuration

// Function to get users with their email addresses from tblaccounts
exports.getUsers = (callback) => {
    const query = `
        SELECT 
            u.id AS user_id,
            u.name,
            DATE(u.birthdate) AS birthdate,  -- Extracting only the date part
            u.address,
            u.contact,
            a.email 
        FROM 
            tbluser u 
        LEFT JOIN 
            tblaccounts a ON u.acc_id = a.id;  -- Assuming acc_id in tbluser references id in tblaccounts
    `;

    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null); // Return error if the query fails
        }

        // Format the birthdate in JavaScript
        results.forEach(user => {
            if (user.birthdate) {
                user.birthdate = new Date(user.birthdate).toLocaleDateString('en-CA'); // Formats to YYYY-MM-DD
            }
        });

        callback(null, results); // Return formatted results if successful
    });
};
