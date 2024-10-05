// models/productModel.js
const db = require('../config/db'); // Adjust the path based on your structure

exports.addProduct = (productData, productImage, callback) => {
    const { productName, price, quantity } = productData;
    const sql = 'INSERT INTO tblproducts (product_name, price, quantity, images_path) VALUES (?, ?, ?, ?)';
    const values = [productName, price, quantity, productImage];

    db.query(sql, values, (err, results) => {
        if (err) {
            return callback(err); // Pass the error to the callback
        }
        callback(null, results); // Pass the results if successful
    });
};

///////////////
exports.getAllProducts = (callback) => {
    const query = 'SELECT * FROM tblProducts'; // Ensure this query is correct
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};


// Get a product by its ID
exports.getProductById = (productId, callback) => {
    const query = 'SELECT * FROM tblproducts WHERE id = ?';
    
    db.query(query, [productId], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        // If product is found, return the first result (since ID is unique)
        callback(null, results[0]);
    });
};

// Update a product by its ID
exports.updateProductById = (productId, updatedData, callback) => {
    const query = `UPDATE tblproducts SET product_name = ?, quantity = ?, price = ? WHERE id = ?`;

    db.query(query, [
        updatedData.product_name,
        updatedData.quantity,
        updatedData.price,
        productId
    ], (err, result) => {
        if (err) {
            console.error("SQL Error:", err); // Log any SQL error
            return callback(err, null);
        }

        return callback(null, result);
    });
};


exports.deleteProductById = (id, callback) => {
    const query = 'DELETE FROM tblproducts WHERE id = ?';

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return callback(err);
        }
        callback(null, result);
    });
};


