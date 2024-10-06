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



exports.getCartItems = (userToken, callback) => {
    const query = `
        SELECT p.id AS product_id, p.product_name, p.price, p.images_path AS image_path, c.quantity
        FROM tblcart c
        JOIN tblproducts p ON c.product_id = p.id
        WHERE c.user_token = ?
    `;

    db.query(query, [userToken], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return callback(err);
        }

        callback(null, results);
    });
};

// cartModel.js
exports.removeItem = (productId, token, callback) => {
    // Your SQL query to remove the item from tblcart based on product ID and user token
    const query = 'DELETE FROM tblcart WHERE product_id = ? AND user_token = ?';
    db.query(query, [productId, token], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};
