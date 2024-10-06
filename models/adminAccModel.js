// adminAccModel.js
const db = require('../config/db'); // Adjust the path as necessary

exports.getAdminAccount = (userToken, callback) => {
    const sql = 'SELECT email, password FROM tblaccounts WHERE token = ?';
    db.query(sql, [userToken], (err, results) => {
        if (err) {
            return callback(err);
        }
        // Assuming results is an array with the user data
        callback(null, results[0]); // Return the first result
    });
};
