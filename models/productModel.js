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
