const db = require('../config/db');

// Function to get all products from the database
exports.getAllProducts = (callback) => {
    const query = 'SELECT id, product_name, price, images_path FROM tblproducts'; // Adjust as necessary
    db.query(query, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};
