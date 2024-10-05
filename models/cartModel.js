const db = require('../config/db'); // Update with your actual DB connection

// Function to validate user token and get account ID
exports.validateToken = (token, callback) => {
    const sql = 'SELECT id FROM tblaccounts WHERE token = ?';
    db.query(sql, [token], (err, results) => {
        if (err) return callback(err); // Handle database errors
        if (results.length === 0) return callback(null, null); // No account found for the token
        callback(null, results[0].id); // Return the account ID if found
    });
};


// Function to add or update cart using the token (not userId)
exports.addToCart = (userToken, productId, callback) => {
    const sql = `
        INSERT INTO tblcart (product_id, user_token, quantity)
        VALUES (?, ?, 1) 
        ON DUPLICATE KEY UPDATE quantity = quantity + 1
    `;
    db.query(sql, [productId, userToken], (err, results) => {
        if (err) return callback(err);
        callback(null); // Successfully added/updated cart
    });
};
